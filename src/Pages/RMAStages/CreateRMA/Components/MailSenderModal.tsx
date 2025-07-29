import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import {
  Close,
  Send,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Preview,
  FormatSize,
  FormatColorText,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
} from "@mui/icons-material";
import { LabelSentEventCreateRequestDTO, RMAResponseDTO } from "../../../../Models/RMAManagerModels/Dto";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import { useCreateSendLabel } from "../../../../Hooks/useCreateSendlabel";

interface MailSenderModalProps {
  open: boolean;
  onClose: () => void;
  rmaData: RMAResponseDTO;
}

interface EmailData {
  senderEmail: string;
  senderName: string;
  recipientEmail: string;
  subject: string;
  body: string;
}

const MailSenderModal: React.FC<MailSenderModalProps> = ({ open, onClose, rmaData }) => {
  const appEmail = useSelector((state: RootState) => state.loginUser).email;
  const appUser = useSelector((state: RootState) => state.loginUser).userName;

  const [emailData, setEmailData] = useState<EmailData>({
    senderEmail: appEmail || "",
    senderName: appUser || "",
    recipientEmail: rmaData.customerEmail || "",
    subject: `RMA Request - RMA #${rmaData.rmaNumber}`,
    body: generateDefaultEmailBody(rmaData),
  });

  const [errors, setErrors] = useState<Partial<EmailData>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [enableRichText, setEnableRichText] = useState(true);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedFontSize, setSelectedFontSize] = useState("14");
  const [selectedTextColor, setSelectedTextColor] = useState("#000000");
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null);
  const { mutate: sendLabel, isPending } = useCreateSendLabel();

  // Font options
  const fontOptions = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Tahoma",
    "Trebuchet MS",
    "Impact",
    "Courier New",
    "Lucida Console",
    "Comic Sans MS",
    "Palatino",
    "Garamond",
    "Bookman",
    "Avant Garde",
  ];

  const fontSizeOptions = ["10", "11", "12", "14", "16", "18", "20", "24", "28", "32", "36"];

  function generateDefaultEmailBody(rma: RMAResponseDTO): string {
    return `Dear ${rma.contactName || "Customer"},

This is regarding your RMA request with the following details:

RMA Number: ${rma.rmaNumber}
Customer Email: ${rma.customerEmail}
Company: ${rma.companyName}
Contact Name: ${rma.contactName}
Phone Number: ${rma.phoneNumber || "Not provided"}
Status: ${rma.stage}

Problem Description:
${rma.rmaProblemDescription || "Not specified"}

${rma.notes ? `Additional Notes:\n${rma.notes}` : ""}

Please let us know if you need any further assistance.

Best regards,
${appUser || "Sales Team"}`;
  }

  const handleFieldChange =
    (field: keyof EmailData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEmailData((prev) => ({ ...prev, [field]: event.target.value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  // Format text preservation helper - converts markdown and text formatting to HTML
  const formatTextToHtml = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold: **text** -> <strong>text</strong>
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic: *text* -> <em>text</em>
      .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>") // Underline: keep as is
      .replace(/\n/g, "<br />") // Line breaks
      .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;") // Tabs
      .replace(/  /g, "&nbsp;&nbsp;"); // Double spaces
  };

  // Convert HTML back to text for editing (for future use when loading saved drafts)
  /*
  const formatHtmlToText = (html: string): string => {
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/<[^>]*>/g, '');
  };
  */

  // WYSIWYG Editor functions using document.execCommand
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateEmailBodyFromEditor();
  };

  const updateEmailBodyFromEditor = () => {
    if (editorRef) {
      const htmlContent = editorRef.innerHTML;
      setEmailData((prev) => ({ ...prev, body: htmlContent }));
    }
  };

  const insertFormatting = (format: string) => {
    if (!enableRichText || isPreviewMode) return;

    switch (format) {
      case "bold":
        execCommand("bold");
        break;
      case "italic":
        execCommand("italic");
        break;
      case "underline":
        execCommand("underline");
        break;
      case "font":
        execCommand("fontName", selectedFont);
        break;
      case "fontSize":
        execCommand("fontSize", "3"); // Standard size, we'll use CSS for px values
        if (editorRef) {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const span = document.createElement("span");
            span.style.fontSize = `${selectedFontSize}px`;
            try {
              range.surroundContents(span);
            } catch (e) {
              // If can't surround, insert at cursor
              span.innerHTML = range.toString();
              range.deleteContents();
              range.insertNode(span);
            }
            updateEmailBodyFromEditor();
          }
        }
        break;
      case "color":
        execCommand("foreColor", selectedTextColor);
        break;
      case "alignLeft":
        execCommand("justifyLeft");
        break;
      case "alignCenter":
        execCommand("justifyCenter");
        break;
      case "alignRight":
        execCommand("justifyRight");
        break;
      default:
        break;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EmailData> = {};

    if (!emailData.senderName.trim()) {
      newErrors.senderName = "Sender name is required";
    }

    if (!emailData.senderEmail.trim()) {
      newErrors.senderEmail = "Sender email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailData.senderEmail)) {
      newErrors.senderEmail = "Invalid sender email format";
    }

    if (!emailData.recipientEmail.trim()) {
      newErrors.recipientEmail = "Recipient email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailData.recipientEmail)) {
      newErrors.recipientEmail = "Invalid recipient email format";
    }

    if (!emailData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    // For body validation, strip HTML tags to check actual content
    const bodyText = emailData.body.replace(/<[^>]*>/g, "").trim();
    if (!bodyText) {
      newErrors.body = "Email body is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendEmail = () => {
    if (!validateForm()) {
      toast.error("Please fix the validation errors before sending");
      return;
    }

    // Clean up and prepare email body
    let emailBody = emailData.body;

    if (enableRichText) {
      // For rich text, ensure proper HTML formatting
      emailBody = formatTextToHtml(emailBody);
    } else {
      // For plain text, convert line breaks to HTML
      emailBody = emailBody.replace(/\n/g, "<br>");
    }

    // Convert to the expected DTO format
    const labelData: LabelSentEventCreateRequestDTO = {
      senderEmail: emailData.senderEmail,
      receiverEmail: emailData.recipientEmail,
      subject: emailData.subject,
      senderName: emailData.senderName,
      message: emailBody,
      rmaNumber: rmaData.rmaNumber,
      contactName: rmaData.contactName,
    };

    sendLabel(labelData, {
      onSuccess: () => {
        // Success is already handled by the hook with toast
        onClose();
      },
      onError: () => {
        // Error is already handled by the hook with toast
      },
    });
  };

  // Reset template function
  const handleResetTemplate = () => {
    const newBody = generateDefaultEmailBody(rmaData);
    setEmailData((prev) => ({ ...prev, body: newBody }));

    // If in rich text mode and editor exists, update the editor content
    if (enableRichText && editorRef) {
      editorRef.innerHTML = formatTextToHtml(newBody);
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (enableRichText && !isPreviewMode && (event.ctrlKey || event.metaKey)) {
      switch (event.key.toLowerCase()) {
        case "b":
          event.preventDefault();
          insertFormatting("bold");
          break;
        case "i":
          event.preventDefault();
          insertFormatting("italic");
          break;
        case "u":
          event.preventDefault();
          insertFormatting("underline");
          break;
        case "l":
          if (event.shiftKey) {
            event.preventDefault();
            insertFormatting("alignLeft");
          }
          break;
        case "e":
          if (event.shiftKey) {
            event.preventDefault();
            insertFormatting("alignCenter");
          }
          break;
        case "r":
          if (event.shiftKey) {
            event.preventDefault();
            insertFormatting("alignRight");
          }
          break;
        default:
          break;
      }
    }

    // For plain text mode, allow normal behavior
    if (!enableRichText && event.key === "Tab") {
      event.preventDefault();
      // Insert tab character in plain text mode
      const target = event.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      const newValue = value.substring(0, start) + "\t" + value.substring(end);
      setEmailData((prev) => ({ ...prev, body: newValue }));

      // Reset cursor position
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      }, 0);
    }
  };

  const handleClose = () => {
    if (!isPending) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Send RMA Email</Typography>
          <IconButton onClick={handleClose} disabled={isPending}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Alert severity="info" sx={{ mb: 3 }}>
          RMA #{rmaData.rmaNumber} has been created successfully. Send notification email to the customer.
        </Alert>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Sender Name */}
          <TextField
            fullWidth
            label="Sender Name *"
            value={emailData.senderName}
            onChange={handleFieldChange("senderName")}
            error={Boolean(errors.senderName)}
            helperText={errors.senderName || "Your name"}
            disabled={isPending}
          />

          {/* Sender Email */}
          <TextField
            fullWidth
            label="From (Sender Email) *"
            value={emailData.senderEmail}
            onChange={handleFieldChange("senderEmail")}
            error={Boolean(errors.senderEmail)}
            helperText={errors.senderEmail || "Enter your email address"}
            disabled={isPending}
          />

          {/* Recipient Email */}
          <TextField
            fullWidth
            label="To (Recipient Email) *"
            value={emailData.recipientEmail}
            onChange={handleFieldChange("recipientEmail")}
            error={Boolean(errors.recipientEmail)}
            helperText={errors.recipientEmail || "Customer's email address"}
            disabled={isPending}
          />

          {/* Subject */}
          <TextField
            fullWidth
            label="Subject *"
            value={emailData.subject}
            onChange={handleFieldChange("subject")}
            error={Boolean(errors.subject)}
            helperText={errors.subject}
            disabled={isPending}
          />

          {/* Email Body with Rich Text Options */}
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="subtitle2">Email Body *</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={enableRichText}
                      onChange={(e) => setEnableRichText(e.target.checked)}
                      size="small"
                    />
                  }
                  label="Rich Text"
                  sx={{ fontSize: "0.875rem" }}
                />
                <Button size="small" variant="outlined" onClick={handleResetTemplate} disabled={isPending}>
                  Reset Template
                </Button>
                <Button
                  size="small"
                  variant={isPreviewMode ? "contained" : "outlined"}
                  startIcon={<Preview />}
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  disabled={isPending}
                >
                  {isPreviewMode ? "Edit" : "Preview"}
                </Button>
              </Box>
            </Box>

            {enableRichText && !isPreviewMode && (
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  mb: 1,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {/* Font Family Selection */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Font</InputLabel>
                  <Select
                    value={selectedFont}
                    label="Font"
                    onChange={(e) => setSelectedFont(e.target.value)}
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {fontOptions.map((font) => (
                      <MenuItem key={font} value={font} sx={{ fontFamily: font }}>
                        {font}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Font Size Selection */}
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={selectedFontSize}
                    label="Size"
                    onChange={(e) => setSelectedFontSize(e.target.value)}
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {fontSizeOptions.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}px
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Font Color Selection */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <input
                    type="color"
                    value={selectedTextColor}
                    onChange={(e) => setSelectedTextColor(e.target.value)}
                    style={{
                      width: "32px",
                      height: "32px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    title="Text Color"
                  />
                  <IconButton size="small" onClick={() => insertFormatting("color")} title="Apply Text Color">
                    <FormatColorText fontSize="small" />
                  </IconButton>
                </Box>

                <Divider orientation="vertical" flexItem />

                {/* Text Formatting Buttons */}
                <IconButton size="small" onClick={() => insertFormatting("bold")} title="Bold (Ctrl+B)">
                  <FormatBold fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => insertFormatting("italic")} title="Italic (Ctrl+I)">
                  <FormatItalic fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => insertFormatting("underline")} title="Underline (Ctrl+U)">
                  <FormatUnderlined fontSize="small" />
                </IconButton>

                <Divider orientation="vertical" flexItem />

                {/* Font Style Buttons */}
                <IconButton size="small" onClick={() => insertFormatting("font")} title="Apply Font Family">
                  <FormatSize fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => insertFormatting("fontSize")} title="Apply Font Size">
                  <FormatSize fontSize="small" />
                </IconButton>

                <Divider orientation="vertical" flexItem />

                {/* Text Alignment Buttons */}
                <IconButton
                  size="small"
                  onClick={() => insertFormatting("alignLeft")}
                  title="Align Left (Ctrl+Shift+L)"
                >
                  <FormatAlignLeft fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => insertFormatting("alignCenter")}
                  title="Align Center (Ctrl+Shift+E)"
                >
                  <FormatAlignCenter fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => insertFormatting("alignRight")}
                  title="Align Right (Ctrl+Shift+R)"
                >
                  <FormatAlignRight fontSize="small" />
                </IconButton>
              </Paper>
            )}

            {isPreviewMode ? (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  minHeight: 300,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  backgroundColor: "#fafafa",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  color: "#333",
                  "& strong, & b": { fontWeight: "bold" },
                  "& em, & i": { fontStyle: "italic" },
                  "& u": { textDecoration: "underline" },
                  "& div": { margin: "0.5em 0" },
                  "& p": { margin: "0.5em 0" },
                }}
                dangerouslySetInnerHTML={{
                  __html: formatTextToHtml(emailData.body),
                }}
              />
            ) : enableRichText ? (
              <Box>
                <Box
                  ref={setEditorRef}
                  contentEditable
                  suppressContentEditableWarning={true}
                  onInput={updateEmailBodyFromEditor}
                  onKeyDown={handleKeyDown}
                  onBlur={updateEmailBodyFromEditor}
                  dangerouslySetInnerHTML={{
                    __html: formatTextToHtml(emailData.body),
                  }}
                  sx={{
                    minHeight: 300,
                    maxHeight: 500,
                    border: errors.body ? "1px solid #d32f2f" : "1px solid #c4c4c4",
                    borderRadius: 1,
                    p: 2,
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "#333",
                    backgroundColor: "#fff",
                    overflowY: "auto",
                    outline: "none",
                    cursor: "text",
                    "&:focus": {
                      borderColor: "#1976d2",
                      borderWidth: "2px",
                    },
                    "& strong, & b": { fontWeight: "bold" },
                    "& em, & i": { fontStyle: "italic" },
                    "& u": { textDecoration: "underline" },
                    "& div": { margin: "0.25em 0" },
                    "& p": { margin: "0.25em 0" },
                    "& br": { lineHeight: "1.2" },
                  }}
                />
                {(errors.body || true) && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: errors.body ? "#d32f2f" : "#666",
                      mt: 0.5,
                      fontSize: "0.75rem",
                      display: "block",
                    }}
                  >
                    {errors.body ||
                      "WYSIWYG Editor - Use toolbar for formatting. Shortcuts: Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+U (Underline), Ctrl+Shift+L/E/R (Align)"}
                  </Typography>
                )}
              </Box>
            ) : (
              <TextField
                id="email-body-textarea"
                fullWidth
                multiline
                rows={12}
                value={emailData.body}
                onChange={handleFieldChange("body")}
                onKeyDown={handleKeyDown}
                error={Boolean(errors.body)}
                helperText={errors.body || "Plain text mode - Switch to Rich Text for formatting options"}
                disabled={isPending}
                sx={{
                  "& .MuiInputBase-inputMultiline": {
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.6,
                  },
                }}
                inputProps={{
                  style: {
                    resize: "vertical",
                  },
                }}
              />
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={isPending}>
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={isPending ? <CircularProgress size={20} /> : <Send />}
          onClick={handleSendEmail}
          disabled={isPending}
          sx={{ minWidth: 120 }}
        >
          {isPending ? "Sending..." : "Send Email"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MailSenderModal;
