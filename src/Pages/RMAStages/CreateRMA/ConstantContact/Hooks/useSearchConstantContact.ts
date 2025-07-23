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
import { authUrl, ConstantContactSearchEmailKey, RMAUserStorageKey } from "../../../../../Constants/APINames";
import { SideBarMenuName } from "../../../../../Constants/SideBarMenuNames";

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
    appUser?.userName ? { UserId: appUser.userName } : undefined,
    !!appUser?.userName && !tokenValidationComplete // Only run if user exists and not completed yet
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

  // Handlers
  const handleSearch = async () => {
    debugger;
    // Prevent search if token validation not complete
    if (!tokenValidationComplete) {
      toast.error("Please wait for token validation to complete");
      return;
    }

    // Prevent search if token is invalid
    if (!persistentTokenValidation?.isValid) {
      toast.error("Valid token required. Redirecting to OAuth...");
      window.location.href = authUrl;
      return;
    }

    if (searchEmail.trim()) {
      localStorage.setItem(ConstantContactSearchEmailKey, searchEmail);

      if (IsTokenValid(appUser?.token)) {
       
        localStorage.setItem(RMAUserStorageKey, JSON.stringify(appUser));
        console.log("✅ Using validated token, proceeding with search");
        setStartSearching(true);
        toast.success("Searching contacts...");
      } else {
        toast.error(`Token is invalid or expired. Please Login again.`);
        setTimeout(() => {
          navigate(SideBarMenuName.LoggedOut.route);
        }, 3000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
    handleKeyPress,
    handleFetchContactDetails,
    handleUseContactDetails,
  };
};
