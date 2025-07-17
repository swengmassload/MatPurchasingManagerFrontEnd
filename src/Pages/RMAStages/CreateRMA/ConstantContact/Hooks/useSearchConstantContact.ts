import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { RootState } from "../../../../../Redux/store";
import { useGetContactByEmail } from "../../../../../Hooks/useGetContactByEmail";
import { useGetContactByContactId } from "../../../../../Hooks/useGetContactByContactId";
import { useGetConfirmIfUserHasExistingValidToken } from "../../../../../Hooks/useGetConfirmIfUserHasExistingValidToken";
import { IsTokenValid } from "../../../../../Utils/IsTokenValidAndFunctionClaimInToken";
import { Contact, DetailContact } from "../../../../../Models/ConstantContactModels/ConstantContactDTO";
import { authUrl, ConstantContactSearchEmailKey, RMAUserStorageKey } from "../../../../../Constants/APINames";
import { SideBarMenuName } from "../../../../../Constants/SideBarMenuNames";

export const useSearchConstantContact = (onContactSelected?: (contact: Contact | null) => void) => {
  // State management
  const [currentSearchEmail, setCurrentSearchEmail] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [startSearching, setStartSearching] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactDetails, setContactDetails] = useState<DetailContact | null>(null);
  const [showingDetails, setShowingDetails] = useState<string | null>(null);
  const [fetchingContactId, setFetchingContactId] = useState<string | null>(null);
  const [loadingToastId, setLoadingToastId] = useState<string | null>(null);
  const [checkingToken, setCheckingToken] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState("");

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

  const {
    data: tokenValidationResult,
    isLoading: isCheckingToken,
    error: tokenValidationError,
  } = useGetConfirmIfUserHasExistingValidToken(
    checkingToken && appUser?.userName ? { UserId: appUser.userName } : undefined,
    checkingToken
  );

  // Effect: Handle OAuth callback
  useEffect(() => {
    const storedEmail = localStorage.getItem(ConstantContactSearchEmailKey);
    if (storedEmail) {
      console.log("✅ Found stored email, starting search:", storedEmail);
      setCurrentSearchEmail(storedEmail);
      setSearchEmail(storedEmail);
      setStartSearching(true);
      localStorage.removeItem(ConstantContactSearchEmailKey);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Effect: Handle successful contact details fetch
  useEffect(() => {
    if (detailResult && fetchingContactId) {
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
  }, [detailResult, fetchingContactId, loadingToastId]);

  // Effect: Handle contact details fetch errors
  useEffect(() => {
    if (detailError && fetchingContactId) {
      console.log("❌ Contact details fetch failed:", detailError);
      setFetchingContactId(null);

      if (loadingToastId) {
        toast.dismiss(loadingToastId);
        setLoadingToastId(null);
      }
      toast.error(`Failed to load contact details: ${detailError.message}`);
    }
  }, [detailError, fetchingContactId, loadingToastId]);

  // Effect: Handle token validation results
  useEffect(() => {
    if (tokenValidationResult && checkingToken) {
      console.log("🔑 Token validation result:", tokenValidationResult);
      setCheckingToken(false);

      if (tokenValidationResult.isValid) {
        console.log("✅ Valid token found on server, proceeding with search");
        setSearchEmail(currentSearchEmail);
        setStartSearching(true);
        toast.success("Valid token found! Searching contacts...");
      } else {
        console.log("❌ No valid token found, redirecting to OAuth");
        toast.success(tokenValidationResult.message || "No valid token found. Redirecting to OAuth...");
        window.location.href = authUrl;
      }
    }
  }, [tokenValidationResult, checkingToken, currentSearchEmail]);

  // Effect: Handle token validation errors
  useEffect(() => {
    if (tokenValidationError && checkingToken) {
      console.log("❌ Token validation failed:", tokenValidationError);
      setCheckingToken(false);
      console.log("🔄 Token validation error, redirecting to OAuth");
      toast.success("Unable to verify existing token. Redirecting to OAuth...");
      window.location.href = authUrl;
    }
  }, [tokenValidationError, checkingToken]);

  // Handlers
  const handleSearch = async () => {
    if (currentSearchEmail.trim()) {
      localStorage.setItem(ConstantContactSearchEmailKey, currentSearchEmail);

      if (IsTokenValid(appUser?.token)) {
        localStorage.setItem(RMAUserStorageKey, JSON.stringify(appUser));
        setCheckingToken(true);
      } else {
        toast.error(`Token is invalid or expired. Please Login again.`);
        setTimeout(() => {
          navigate(SideBarMenuName.LoggedOut.route);
        }, 3000);
        return;
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFetchContactDetails = (contact: Contact) => {
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
    // State
    currentSearchEmail,
    setCurrentSearchEmail,
    searchEmail,
    selectedContact,
    contactDetails,
    showingDetails,
    fetchingContactId,
    successMessage,
    tokenValidationResult,

    // API states
    result,
    isLoading,
    error,
    isLoadingDetails,
    isCheckingToken,

    // Handlers
    handleSearch,
    handleKeyPress,
    handleFetchContactDetails,
    handleUseContactDetails,
  };
};
