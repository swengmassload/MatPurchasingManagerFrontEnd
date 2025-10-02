import { useState, useEffect } from "react";
import {   Lead, Opportunity } from "../../../../../Models/ConstantContactModels/ConstantContactDTO";
import { useGetContactInSharpSpringByEmail } from "../../../../../Hooks/useGetContactInSharpSpringByEmail";
import toast from "react-hot-toast";

export const useSearchConstantContact = (onLeadSelected?: (contact: Lead | null) => void, onOpportunitySelected?: (contact: Opportunity | null) => void) => {

  const [searchEmail, setSearchEmail] = useState<string>("");
  const [startSearching, setStartSearching] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const {
    data: result,
    isLoading,
    error,
  } = useGetContactInSharpSpringByEmail(searchEmail ? { contactEmail: searchEmail } : undefined, startSearching);


  useEffect(() => {
    if (startSearching && !isLoading) {
      setStartSearching(false);
    }
  }, [startSearching, isLoading]);


  const handleSearch = async () => {




    if (searchEmail.trim()) {
      setStartSearching(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  const handleUseOpportunityDetails = (details: Opportunity) => {
    setSelectedOpportunity(details);
    setSuccessMessage(`✅ selected for RMA`);
    onOpportunitySelected?.(details);
  };

  const handleUseLeadDetails = (details: Lead) => {
    setSelectedLead(details);
   setSuccessMessage(`✅ selected for RMA`);
    onLeadSelected?.(details);
    toast.success(`Contact selected for RMA creation!`);
  };

  return {

    searchEmail,
    setSearchEmail,
    selectedLead,
    selectedOpportunity,
    successMessage,
    result,
    isLoading,
    error,
    handleSearch,
    handleKeyPress: handleKeyDown,
    handleUseLeadDetails,
    handleUseOpportunityDetails,
  };
};


