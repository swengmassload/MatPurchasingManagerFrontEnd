import React from "react";
import { Box, Stack, TextField, Button } from "@mui/material";
import { Email } from "@mui/icons-material";

interface SearchFormProps {
  currentSearchEmail: string;
  onEmailChange: (email: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  currentSearchEmail,
  onEmailChange,
  onSearch,
  onKeyPress,
  isLoading,
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
          disabled={isLoading}
          slotProps={{
            input: {
              startAdornment: <Email sx={{ mr: 1, color: "action.active" }} />,
            },
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
  );
};

export default SearchForm;
