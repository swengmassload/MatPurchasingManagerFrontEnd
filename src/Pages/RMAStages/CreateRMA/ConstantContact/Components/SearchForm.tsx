import React from "react";
import { Box, Stack, TextField, Button } from "@mui/material";
import { Email } from "@mui/icons-material";

interface SearchFormProps {
  currentSearchEmail: string;
  onEmailChange: (email: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  isCheckingToken: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  currentSearchEmail,
  onEmailChange,
  onSearch,
  onKeyPress,
  isLoading,
  isCheckingToken,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label="Email Address"
          variant="outlined"
          value={currentSearchEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Enter email to search"
          fullWidth
          disabled={isLoading || isCheckingToken}
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
          onClick={onSearch}
          disabled={!currentSearchEmail.trim() || isLoading || isCheckingToken}
          sx={{
            minWidth: 120,
            height: 56,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          {isLoading ? "Processing..." : isCheckingToken ? "Checking Token..." : "Search"}
        </Button>
      </Stack>
    </Box>
  );
};

export default SearchForm;
