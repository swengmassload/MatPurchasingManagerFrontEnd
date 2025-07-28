import React from "react";
import { Box, Button } from "@mui/material";
import { Email, AttachFile, AutoAwesome } from "@mui/icons-material";
import { Contact } from "../../../../Models/ConstantContactModels/ConstantContactDTO";
import { RMACreateRequestDTO } from "../../../../Models/RMAManagerModels/Dto";

interface FormActionsProps {
  selectedContact?: Contact | null;
  formData: RMACreateRequestDTO;
  isSubmitting: boolean;
  onClearContact: () => void;
  onSendMail: (files?: File[]) => void;
  onSendMailWithAttachments?: (files: File[]) => void;
  onSendMailWithAutoFile?: () => void;
  onReset: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  selectedContact,
  formData,
  isSubmitting,
  onClearContact,
  onSendMail,
  onSendMailWithAttachments,
  onSendMailWithAutoFile,
  onReset,
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
      {selectedContact && (
        <Button type="button" variant="outlined" color="warning" onClick={onClearContact} disabled={isSubmitting}>
          Clear Contact
        </Button>
      )}

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

      <Button type="button" variant="outlined" onClick={onReset} disabled={isSubmitting}>
        Reset Form
      </Button>
      <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ minWidth: 120 }}>
        {isSubmitting ? "Creating..." : "Create RMA"}
      </Button>
    </Box>
  );
};

export default FormActions;
