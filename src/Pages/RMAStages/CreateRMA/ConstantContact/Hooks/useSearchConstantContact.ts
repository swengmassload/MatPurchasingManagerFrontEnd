import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { RootState } from "../../../../../Redux/store";
import { useGetContactByEmail } from "../../../../../Hooks/useGetContactByEmail";
import { useGetContactByContactId } from "../../../../../Hooks/useGetContactByContactId";
import {
  useGetConfirmIfUserHasExistingValidToken,
  ValidToken,
} from "../../../../../Hooks/useGetConfirmIfUserHasExistingValidToken";
import { IsTokenValid } from "../../../../../Utils/IsTokenValidAndFunctionClaimInToken";
import { Contact, DetailContact } from "../../../../../Models/ConstantContactModels/ConstantContactDTO";
import { ConstantContactSearchEmailKey, RMAUserStorageKey } from "../../../../../Constants/APINames";
import { SideBarMenuName } from "../../../../../Constants/SideBarMenuNames";
import { getConfig } from "../../../../../Services/ConfigService";

export const useSearchConstantContact = (onContactSelected?: (contact: Contact | null) => void) => {
  // State management
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [startSearching, setStartSearching] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactDetails, setContactDetails] = useState<DetailContact | null>(null);
  const [showingDetails, setShowingDetails] = useState<string | null>(null);
  const [fetchingContactId, setFetchingContactId] = useState<string | null>(null);
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Token validation state - runs immediately on mount
  const [tokenValidationComplete, setTokenValidationComplete] = useState<boolean>(false);
  const [persistentTokenValidation, setPersistentTokenValidation] = useState<ValidToken | null>(null);

  const appUser = useSelector((state: RootState) => state.loginUser);
  const navigate = useNavigate();

  // API hooks
  const {
    data: result,
    isLoading,
    error,
  } = useGetContactByEmail(searchEmail ? { email: searchEmail } : undefined, startSearching);

  const {
    data: detailResult,
    isLoading: isLoadingDetails,
    error: detailError,
  } = useGetContactByContactId(fetchingContactId ? { ContactId: fetchingContactId } : undefined, !!fetchingContactId);

  // Token validation hook - runs immediately when user exists
  const {
    data: tokenValidationResult,
    isLoading: isCheckingToken,
    error: tokenValidationError,
  } = useGetConfirmIfUserHasExistingValidToken(
    appUser?.email ? { UserId: appUser.email } : undefined,
    !!appUser?.email && !tokenValidationComplete // Only run if user exists and not completed yet
  );

  // Effect: Handle token validation results (runs once)
  useEffect(() => {
    if (tokenValidationResult && !tokenValidationComplete) {
      console.log("🔑 Token validation completed:", tokenValidationResult);
      setPersistentTokenValidation(tokenValidationResult);
      setTokenValidationComplete(true);
    }

    if (tokenValidationError && !tokenValidationComplete) {
      console.log("❌ Token validation failed:", tokenValidationError);
      // Set a default invalid token result
      setPersistentTokenValidation({ isValid: false, message: "Token validation failed" });
      setTokenValidationComplete(true);
    }
  }, [tokenValidationResult, tokenValidationError, tokenValidationComplete]);

  // Effect: Handle OAuth callback (runs once on mount)
  useEffect(() => {
    const storedEmail = localStorage.getItem(ConstantContactSearchEmailKey);
    if (storedEmail) {
      console.log("✅ Found stored email, starting search:", storedEmail);
      setSearchEmail(storedEmail);
      setStartSearching(true);
      localStorage.removeItem(ConstantContactSearchEmailKey);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Effect: Handle contact details fetch
  useEffect(() => {
    if (!fetchingContactId) return;

    if (detailResult) {
      console.log("✅ Contact details fetched successfully:", detailResult);
      setContactDetails(detailResult);
      setShowingDetails(fetchingContactId);
      setFetchingContactId(null);

      if (loadingToastId) {
        toast.dismiss(loadingToastId);
        setLoadingToastId(null);
      }
      toast.success(`Contact details loaded successfully!`);
    }

    if (detailError) {
      console.log("❌ Contact details fetch failed:", detailError);
      setFetchingContactId(null);

      if (loadingToastId) {
        toast.dismiss(loadingToastId);
        setLoadingToastId(null);
      }
      toast.error(`Failed to load contact details: ${detailError.message}`);
    }
  }, [detailResult, detailError, fetchingContactId, loadingToastId]);

  // Effect: Reset search flag after search completes to prevent auto-search on email changes
  useEffect(() => {
    if (startSearching && !isLoading) {
      // Search has completed (either success or error), reset the flag
      setStartSearching(false);
    }
  }, [startSearching, isLoading]);

  const getAuthUrl = async () => {
    const clientId = await getConfig("CLIENTID");
    const redirectRoute = await getConfig("REDIRECTROUTE");
    const frontEndPortocol = await getConfig("RMAMANAGERFRONT_PORT");
    const gateWay = await getConfig("GATEWAYSERVERIP");
    const frontEndProtocol = await getConfig("FRONTENDPROTOCOL");
    const redirectUri = `${frontEndProtocol}${gateWay}${frontEndPortocol}${redirectRoute}`;
    const state = Math.random().toString(36).substring(2);
    const constantAuthUrl = await getConfig("CONSTANTAUTHURL");
    const authUrl = `${constantAuthUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=contact_data%20offline_access&state=${state}`;
    console.log("🔗 Generated auth URL:", authUrl);
    return authUrl;
     };

  const handleSearch = async () => {

    if (!tokenValidationComplete) {
      toast.error("Please wait for token validation to complete");
      return;
    }


    if (!persistentTokenValidation?.isValid) {
      toast.error("Valid token required. Redirecting to OAuth...");
      // store login user and search email in localStorage b4 it will redirect
      localStorage.setItem(RMAUserStorageKey, JSON.stringify(appUser));
      localStorage.setItem(ConstantContactSearchEmailKey, searchEmail);

      const authUrl = await getAuthUrl();
      console.log("🔗 Redirecting to OAuth URL:", authUrl);

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Optional delay for UX
      debugger;
      window.location.href = authUrl;
      return;
    }

    if (searchEmail.trim()) {
      if (IsTokenValid(appUser?.token)) {
        console.log("✅ Using validated token, proceeding with search");
        setStartSearching(true);
        toast.success("Searching contacts...");
      } else {
        localStorage.removeItem(ConstantContactSearchEmailKey);
        toast.error(`Token is invalid or expired. Please Login again.`);
        setTimeout(() => {
          navigate(SideBarMenuName.LoggedOut.route);
        }, 3000);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFetchContactDetails = (contact: Contact) => {
    // Prevent if token validation not complete or invalid
    if (!tokenValidationComplete || !persistentTokenValidation?.isValid) {
      toast.error("Valid token required for this operation");
      return;
    }

    console.log("📋 Fetching contact details for:", contact.contact_id);
    setFetchingContactId(contact.contact_id);
    const toastId = toast.loading(`Fetching details for ${contact.first_name} ${contact.last_name}...`);
    setLoadingToastId(toastId);
  };

  const handleUseContactDetails = (details: DetailContact) => {
    setSelectedContact(details);
    setSuccessMessage(`✅ ${details.first_name} ${details.last_name} selected for RMA`);
    onContactSelected?.(details);
    toast.success(`Contact ${details.first_name} ${details.last_name} selected for RMA creation!`);
  };

  return {
    // Token validation state (primary concern)
    tokenValidationComplete,
    tokenValidationResult: persistentTokenValidation,
    isCheckingToken,

    // State
    searchEmail,
    setSearchEmail,
    selectedContact,
    contactDetails,
    showingDetails,
    fetchingContactId,
    successMessage,

    // API states
    result,
    isLoading,
    error,
    isLoadingDetails,

    // Handlers
    handleSearch,
    handleKeyPress: handleKeyDown,
    handleFetchContactDetails,
    handleUseContactDetails,
  };
};
