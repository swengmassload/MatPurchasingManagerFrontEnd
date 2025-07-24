import React, { useState } from "react";
import { Box, Button, Stack, Divider } from "@mui/material";
import { Email, Send } from "@mui/icons-material";
import FileUploadComponent from "./FileUploadComponent";

interface EmailWithAttachmentsProps {
  onSendMailBasic: () => void;
  onSendMailWithAttachments: (files: File[]) => void;
  disabled?: boolean;
}

const EmailWithAttachments: React.FC<EmailWithAttachmentsProps> = ({
  onSendMailBasic,
  onSendMailWithAttachments,
  disabled = false,
}) => {
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);

  const handleSendWithAttachments = () => {
    if (attachmentFiles.length > 0) {
      onSendMailWithAttachments(attachmentFiles);
    } else {
      onSendMailBasic();
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* File Upload Section */}
      <FileUploadComponent
        onFilesChange={setAttachmentFiles}
        maxFiles={3}
        maxSizePerFile={5}
        acceptedFileTypes={[".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".txt", ".xlsx", ".csv"]}
        disabled={disabled}
      />

      <Divider sx={{ my: 3 }} />

      {/* Email Action Buttons */}
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" startIcon={<Email />} onClick={onSendMailBasic} disabled={disabled}>
          Send Basic Email
        </Button>

        <Button variant="contained" startIcon={<Send />} onClick={handleSendWithAttachments} disabled={disabled}>
          {attachmentFiles.length > 0
            ? `Send Email (${attachmentFiles.length} attachment${attachmentFiles.length > 1 ? "s" : ""})`
            : "Send Email"}
        </Button>
      </Stack>
    </Box>
  );
};

export default EmailWithAttachments;
