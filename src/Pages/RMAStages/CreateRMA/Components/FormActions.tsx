import React from "react";
import { Box, Button } from "@mui/material";
import { Email, AttachFile, AutoAwesome } from "@mui/icons-material";
import { RMACreateRequestDTO } from "../../../../Models/RMAManagerModels/Dto";

interface FormActionsProps {
  formData: RMACreateRequestDTO;
  isSubmitting: boolean;
  onSendMail: (files?: File[]) => void;
  onSendMailWithAttachments?: (files: File[]) => void;
  onSendMailWithAutoFile?: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  formData,
  isSubmitting,
  onSendMail,
  onSendMailWithAttachments,
  onSendMailWithAutoFile,
}) => {
  const [attachmentFiles, setAttachmentFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachmentFiles(files);
  };

  const handleSendWithAttachments = () => {
    if (onSendMailWithAttachments && attachmentFiles.length > 0) {
      onSendMailWithAttachments(attachmentFiles);
      setAttachmentFiles([]);
    }
  };

  const handleSendWithAutoFile = () => {
    if (onSendMailWithAutoFile) {
      onSendMailWithAutoFile();
    }
  };

  const handleSendBasicMail = () => {
    onSendMail();
  };

  const isEmailDisabled = isSubmitting || !formData.customerEmail;

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, alignItems: "center" }}>
      {/* Email Options */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          type="button"
          variant="outlined"
          color="info"
          startIcon={<Email />}
          onClick={handleSendBasicMail}
          disabled={isEmailDisabled}
          sx={{ minWidth: 120 }}
        >
          Send Mail
        </Button>

        {(onSendMailWithAttachments || onSendMailWithAutoFile) && (
          <>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              startIcon={<AutoAwesome />}
              onClick={handleSendWithAutoFile}
              disabled={isEmailDisabled || !onSendMailWithAutoFile}
              title="Send email with auto-generated RMA file"
            >
              Send + Auto File
            </Button>

            <Button
              type="button"
              variant="outlined"
              color="secondary"
              startIcon={<AttachFile />}
              onClick={() => fileInputRef.current?.click()}
              disabled={isEmailDisabled || !onSendMailWithAttachments}
              title="Send email with custom attachments"
            >
              Send + Attachments
            </Button>

            <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} style={{ display: "none" }} />

            {attachmentFiles.length > 0 && (
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={handleSendWithAttachments}
                disabled={isEmailDisabled}
                sx={{ minWidth: 120 }}
              >
                Send ({attachmentFiles.length} files)
              </Button>
            )}
          </>
        )}
      </Box>

      <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ minWidth: 120 }}>
        {isSubmitting ? "Creating..." : "Create RMA"}
      </Button>
    </Box>
  );
};

export default FormActions;
