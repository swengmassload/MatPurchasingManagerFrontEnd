import React, { useState, useEffect } from "react";
import { authUrl, ConstantContactSearchEmailKey, RMAUserStorageKey } from "../../../../Constants/APINames";
import { useGetContactByEmail } from "../../../../Hooks/useGetContactByEmail";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import { IsTokenValid } from "../../../../Utils/IsTokenValidAndFunctionClaimInToken";
import { formatDate } from "../../../../Utils/formatDate";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { SideBarMenuName } from "../../../../Constants/SideBarMenuNames";

const SearchConstantContact = () => {
  console.log("🔄 SearchConstantContact component rendered");
  //const [searchTerm, setSearchTerm] = useState("Akomspatrick@yahoo.com");
  const [currentSearchEmail, setCurrentSearchEmail] = useState<string>("");
  const [startSearching, setStartSearching] = useState<boolean>(false);
  const appUser = useSelector((state: RootState) => state.loginUser);
  const navigate = useNavigate();
  // Use the React Query hook
  const {
    data: result,
    isLoading,
    error,
  } = useGetContactByEmail(currentSearchEmail ? { email: currentSearchEmail } : undefined, startSearching);

  useEffect(() => {
    const storedEmail = localStorage.getItem(ConstantContactSearchEmailKey);

    if (storedEmail) {
      // OAuth callback received, now search for the stored email
      console.log("✅ Found stored email, starting search:", storedEmail);
      setCurrentSearchEmail(storedEmail);
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
      }

      // Redirect to OAuth
      console.log("🔄 Redirecting to OAuth:", authUrl);
      window.location.href = authUrl;
    }
  };

  //   const handleKeyDown = async(e: React.KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //      await handleSearch();
  //     }
  //   };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h3>Search Constant Contact</h3>
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <input
          type="email"
          value={currentSearchEmail}
          onChange={(e) => setCurrentSearchEmail(e.target.value)}
          //   onKeyDown={handleKeyDown}
          placeholder="Enter email address..."
          disabled={isLoading as boolean}
          style={{
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px",
            opacity: isLoading ? 0.6 : 1,
          }}
        />
        <button
          onClick={handleSearch}
          disabled={!currentSearchEmail.trim() || (isLoading as boolean)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentSearchEmail.trim() && !isLoading ? "pointer" : "not-allowed",
            fontSize: "14px",
            opacity: currentSearchEmail.trim() && !isLoading ? 1 : 0.6,
          }}
        >
          {isLoading ? "Processing..." : "Search"}
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div style={{ marginTop: "10px", color: "#666" }}>Processing OAuth authentication and searching...</div>
      )}

      {/* Error display */}
      {error && (
        <div
          style={{
            marginTop: "10px",
            color: "#d32f2f",
            padding: "10px",
            border: "1px solid #f44336",
            borderRadius: "4px",
          }}
        >
          Error: {error.message}
        </div>
      )}

      {/* Search results */}
      {result && result.contacts && result.contacts.length > 0 && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}>
          <h4>
            Search Results ({result.contacts.length} contact{result.contacts.length !== 1 ? "s" : ""} found):
          </h4>
          {result.contacts.map((contact) => (
            <div
              key={contact.contact_id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #eee",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <div>
                <strong>Contact ID:</strong> {contact.contact_id}
              </div>
              <div>
                <strong>Name:</strong> {contact.first_name || "N/A"} {contact.last_name || "N/A"}
              </div>
              <div>
                <strong>Email:</strong> {contact.email_address?.address || "N/A"}
              </div>
              <div>
                <strong>Job Title:</strong> {contact.job_title || "N/A"}
              </div>
              <div>
                <strong>Permission to Send:</strong> {contact.email_address?.permission_to_send || "N/A"}
              </div>
              <div>
                <strong>Opt-in Source:</strong> {contact.email_address?.opt_in_source || "N/A"}
              </div>
              <div>
                <strong>Created:</strong> {formatDate(contact.created_at)}
              </div>
              <div>
                <strong>Updated:</strong> {formatDate(contact.updated_at)}
              </div>
            </div>
          ))}

          {/* Raw JSON for debugging */}
          <details style={{ marginTop: "10px" }}>
            <summary style={{ cursor: "pointer", color: "#666" }}>Show Raw JSON</summary>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px", marginTop: "10px" }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* No results found */}
      {result && result.contacts && result.contacts.length === 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            backgroundColor: "#fff3cd",
            color: "#856404",
          }}
        >
          <h4>No contacts found</h4>
          <p>
            No contacts were found for the email address: <strong>{currentSearchEmail}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchConstantContact;
