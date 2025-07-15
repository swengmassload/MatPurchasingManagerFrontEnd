import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Divider, Stack, Chip } from "@mui/material";
import { Search, Email, Business } from "@mui/icons-material";
import { authUrl, ConstantContactSearchEmailKey, RMAUserStorageKey } from "../../../../Constants/APINames";
import { useGetContactByEmail } from "../../../../Hooks/useGetContactByEmail";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import { IsTokenValid } from "../../../../Utils/IsTokenValidAndFunctionClaimInToken";
import { formatDate } from "../../../../Utils/formatDate";
import { Contact } from "../../../../Models/ConstantContactModels/ConstantContactDTO";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { SideBarMenuName } from "../../../../Constants/SideBarMenuNames";

interface SearchConstantContactProps {
  onContactSelected?: (contact: Contact | null) => void;
}

const SearchConstantContact: React.FC<SearchConstantContactProps> = ({ onContactSelected }) => {
  console.log("🔄 SearchConstantContact component rendered");
  const [currentSearchEmail, setCurrentSearchEmail] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>(""); // Email to actually search for
  const [startSearching, setStartSearching] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const appUser = useSelector((state: RootState) => state.loginUser);
  const navigate = useNavigate();

  // Use the React Query hook - only search when searchEmail is set
  const {
    data: result,
    isLoading,
    error,
  } = useGetContactByEmail(searchEmail ? { email: searchEmail } : undefined, startSearching);

  useEffect(() => {
    const storedEmail = localStorage.getItem(ConstantContactSearchEmailKey);

    if (storedEmail) {
      // OAuth callback received, now search for the stored email
      console.log("✅ Found stored email, starting search:", storedEmail);
      setCurrentSearchEmail(storedEmail);
      setSearchEmail(storedEmail); // Set the search email to trigger the hook
      setStartSearching(true);
      // Clean up
      localStorage.removeItem(ConstantContactSearchEmailKey);

      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      console.log("❌ No stored email found");
    }
  }, []);

  const handleSearch = async () => {
    if (currentSearchEmail.trim()) {
      localStorage.setItem(ConstantContactSearchEmailKey, currentSearchEmail);

      if (IsTokenValid(appUser?.token)) {
        localStorage.setItem(RMAUserStorageKey, JSON.stringify(appUser));
      } else {
        toast.error(`Token is invalid or expired. Please Login again.`);
        setTimeout(() => {
          navigate(SideBarMenuName.LoggedOut.route);
        }, 3000);
        return;
      }

      // Set the search email to trigger the search and redirect to OAuth
      setSearchEmail(currentSearchEmail);
      console.log("🔄 Redirecting to OAuth:", authUrl);
      window.location.href = authUrl;
    }
  };

  // Handle Enter key press in the search field
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle contact selection
  const handleUseContact = (contact: Contact) => {
    setSelectedContact(contact);
    setSuccessMessage(`✅ ${contact.first_name} ${contact.last_name} selected for RMA`);
    onContactSelected?.(contact);
  //  toast.success(`Contact ${contact.first_name} ${contact.last_name} selected successfully!`);
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 2,
        background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
        border: "1px solid #e0e0e0",
        height: "fit-content",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Search sx={{ mr: 2, color: "primary.main", fontSize: 32 }} />
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: "1.4rem",
            }}
          >
            Search Constant Contact
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Search Section */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Email Address"
              variant="outlined"
              value={currentSearchEmail}
              onChange={(e) => setCurrentSearchEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter email to search"
              fullWidth
              disabled={isLoading}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: "action.active" }} />,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#fafafa",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={!currentSearchEmail.trim() || isLoading}
              sx={{
                minWidth: 120,
                height: 56,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {isLoading ? "Processing..." : "Search"}
            </Button>
          </Stack>
        </Box>

        {/* Success Message */}
        {successMessage && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              backgroundColor: "#e8f5e8",
              border: "1px solid #4caf50",
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" sx={{ color: "#2e7d32", fontWeight: 500 }}>
              {successMessage}
            </Typography>
          </Box>
        )}

        {/* Loading State */}
        {isLoading && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              backgroundColor: "#e3f2fd",
              border: "1px solid #2196f3",
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" sx={{ color: "#1565c0" }}>
              Processing OAuth authentication and searching...
            </Typography>
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              backgroundColor: "#ffebee",
              border: "1px solid #f44336",
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" sx={{ color: "#c62828" }}>
              Error: {error?.message || "Failed to search contacts"}
            </Typography>
          </Box>
        )}

        {/* Search Results */}
        {result?.contacts && result.contacts.length > 0 && (
          <Box>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Search Results ({result.contacts.length} contact{result.contacts.length !== 1 ? "s" : ""} found)
            </Typography>
            <Stack spacing={2}>
              {result.contacts.map((contact) => (
                <Card
                  key={contact.contact_id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border:
                      selectedContact?.contact_id === contact.contact_id ? "2px solid #4caf50" : "1px solid #e0e0e0",
                    backgroundColor: selectedContact?.contact_id === contact.contact_id ? "#f1f8e9" : "#ffffff",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: "#1976d2",
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <Stack spacing={2}>
                    {/* Contact Header */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            mb: 0.5,
                          }}
                        >
                          {contact.first_name || "N/A"} {contact.last_name || "N/A"}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          <Chip
                            size="small"
                            label={contact.email_address?.permission_to_send || "Unknown"}
                            color={contact.email_address?.permission_to_send === "implicit" ? "success" : "default"}
                            sx={{ fontSize: "0.75rem" }}
                          />
                          {contact.email_address?.opt_in_source && (
                            <Chip
                              size="small"
                              label={contact.email_address.opt_in_source}
                              variant="outlined"
                              sx={{ fontSize: "0.75rem" }}
                            />
                          )}
                        </Stack>
                      </Box>
                      <Button
                        variant={selectedContact?.contact_id === contact.contact_id ? "outlined" : "contained"}
                        size="small"
                        onClick={() => handleUseContact(contact)}
                        disabled={selectedContact?.contact_id === contact.contact_id}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          minWidth: 120,
                        }}
                      >
                        {selectedContact?.contact_id === contact.contact_id ? "Selected" : "Use Contact"}
                      </Button>
                    </Box>

                    {/* Contact Details */}
                    <Stack spacing={1}>
                      {contact.email_address?.address && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Email sx={{ mr: 1, color: "action.active", fontSize: 18 }} />
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {contact.email_address.address}
                          </Typography>
                        </Box>
                      )}
                      {contact.job_title && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Business sx={{ mr: 1, color: "action.active", fontSize: 18 }} />
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {contact.job_title}
                          </Typography>
                        </Box>
                      )}
                      <Typography variant="caption" sx={{ color: "text.disabled" }}>
                        Created: {formatDate(contact.created_at)}
                        {contact.updated_at && ` • Updated: ${formatDate(contact.updated_at)}`}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {/* No Results */}
        {result?.contacts && result.contacts.length === 0 && searchEmail && (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
              backgroundColor: "#fff3cd",
              border: "1px solid #ffc107",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: "#856404", mb: 1 }}>
              No contacts found
            </Typography>
            <Typography variant="body1" sx={{ color: "#856404" }}>
              No contacts were found for "{searchEmail}"
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchConstantContact;
