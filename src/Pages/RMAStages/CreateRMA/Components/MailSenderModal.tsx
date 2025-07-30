import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  FormControlLabel,
  Switch,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Alert,
  Tooltip,
  Chip,
} from "@mui/material";
import { FormatBold, FormatItalic, FormatUnderlined, FormatColorText, Close, Send } from "@mui/icons-material";

import { LabelSentEventCreateRequestDTO, RMAResponseDTO } from "../../../../Models/RMAManagerModels/Dto";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import toast from "react-hot-toast";
import { useCreateSendLabel } from "../../../../Hooks/useCreateSendLabel";

interface EmailData {
  senderName: string;
  senderEmail: string;
  recipientEmail: string;
  subject: string;
  body: string;
}

interface MailSenderModalProps {
  open: boolean;
  onClose: () => void;
  rmaData: RMAResponseDTO;
}

const MailSenderModal: React.FC<MailSenderModalProps> = ({ open, onClose, rmaData }) => {
  const appEmail = useSelector((state: RootState) => state.loginUser).email;
  const appUser = useSelector((state: RootState) => state.loginUser).userName;
  const { mutate: sendLabel, isPending } = useCreateSendLabel();

  const [emailData, setEmailData] = useState<EmailData>({
    senderName: appUser || "",
    senderEmail: appEmail || "",
    recipientEmail: rmaData.customerEmail || "",
    subject: `RMA Request - RMA #${rmaData.rmaNumber}`,
    body: generateDefaultEmailBody(rmaData),
  });

  const [errors, setErrors] = useState<Partial<EmailData>>({});
  const [enableRichText, setEnableRichText] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedFontSize, setSelectedFontSize] = useState(14);
  const [selectedTextColor, setSelectedTextColor] = useState("#000000");

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setEmailData({
        senderName: appUser || "",
        senderEmail: appEmail || "",
        recipientEmail: rmaData.customerEmail || "",
        subject: `RMA Request - RMA #${rmaData.rmaNumber}`,
        body: generateDefaultEmailBody(rmaData),
      });
      setErrors({});
      setIsPreviewMode(false);
    }
  }, [open, appUser, appEmail, rmaData]);

  // Font options
  const fontOptions = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
    "Calibri",
    "Tahoma",
  ];

  const fontSizeOptions = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36];

  function generateDefaultEmailBody(rma: RMAResponseDTO): string {
    return `Dear ${rma.contactName || "Customer"},

Thank you for contacting us regarding your RMA request.

**RMA Details:**
- RMA Number: ${rma.rmaNumber}
- Issue Description: ${rma.rmaProblemDescription || "N/A"}
- Status: ${rma.stage || "In Process"}

We will process your request and keep you updated on the progress.

If you have any questions, please don't hesitate to contact us.

Best regards,
${appUser || "Customer Service Team"}`;
  }

  // Format text preservation helper - converts plain text to HTML with formatting
  const formatTextToHtml = (text: string): string => {
    if (!text) return "";

    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold: **text** -> <strong>text</strong>
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic: *text* -> <em>text</em>
      .replace(/___(.*?)___/g, "<u>$1</u>") // Underline: ___text___ -> <u>text</u>
      .replace(/\[FONT:(.*?)\](.*?)\[\/FONT\]/g, '<span style="font-family: $1">$2</span>') // Font
      .replace(/\[SIZE:(.*?)\](.*?)\[\/SIZE\]/g, '<span style="font-size: $1px">$2</span>') // Size
      .replace(/\[COLOR:(.*?)\](.*?)\[\/COLOR\]/g, '<span style="color: $1">$2</span>') // Color
      .replace(/\n/g, "<br />") // Line breaks
      .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;") // Tabs
      .replace(/  /g, "&nbsp;&nbsp;"); // Double spaces
  };

  // Simple formatting functions that work with textarea
  const insertFormatting = (format: string) => {
    if (!enableRichText || isPreviewMode) return;

    const textarea = document.getElementById("email-body-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = emailData.body.substring(start, end);
    const beforeText = emailData.body.substring(0, start);
    const afterText = emailData.body.substring(end);

    let newText = "";
    let cursorPos = start;

    switch (format) {
      case "bold":
        if (selectedText) {
          newText = beforeText + `**${selectedText}**` + afterText;
          cursorPos = start + selectedText.length + 4;
        } else {
          newText = beforeText + "****" + afterText;
          cursorPos = start + 2;
        }
        break;
      case "italic":
        if (selectedText) {
          newText = beforeText + `*${selectedText}*` + afterText;
          cursorPos = start + selectedText.length + 2;
        } else {
          newText = beforeText + "**" + afterText;
          cursorPos = start + 1;
        }
        break;
      case "underline":
        if (selectedText) {
          newText = beforeText + `___${selectedText}___` + afterText;
          cursorPos = start + selectedText.length + 6;
        } else {
          newText = beforeText + "______" + afterText;
          cursorPos = start + 3;
        }
        break;
      case "font":
        if (selectedText) {
          newText = beforeText + `[FONT:${selectedFont}]${selectedText}[/FONT]` + afterText;
          cursorPos = start + selectedText.length + selectedFont.length + 15;
        } else {
          newText = beforeText + `[FONT:${selectedFont}][/FONT]` + afterText;
          cursorPos = start + selectedFont.length + 8;
        }
        break;
      case "fontSize":
        if (selectedText) {
          newText = beforeText + `[SIZE:${selectedFontSize}]${selectedText}[/SIZE]` + afterText;
          cursorPos = start + selectedText.length + selectedFontSize.toString().length + 15;
        } else {
          newText = beforeText + `[SIZE:${selectedFontSize}][/SIZE]` + afterText;
          cursorPos = start + selectedFontSize.toString().length + 8;
        }
        break;
      case "color":
        if (selectedText) {
          newText = beforeText + `[COLOR:${selectedTextColor}]${selectedText}[/COLOR]` + afterText;
          cursorPos = start + selectedText.length + selectedTextColor.length + 17;
        } else {
          newText = beforeText + `[COLOR:${selectedTextColor}][/COLOR]` + afterText;
          cursorPos = start + selectedTextColor.length + 9;
        }
        break;
      default:
        return;
    }

    setEmailData((prev) => ({ ...prev, body: newText }));

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = cursorPos;
    }, 0);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EmailData> = {};

    if (!emailData.senderName.trim()) {
      newErrors.senderName = "Sender name is required";
    }

    if (!emailData.senderEmail.trim()) {
      newErrors.senderEmail = "Sender email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailData.senderEmail)) {
      newErrors.senderEmail = "Please enter a valid email address";
    }

    if (!emailData.recipientEmail.trim()) {
      newErrors.recipientEmail = "Recipient email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailData.recipientEmail)) {
      newErrors.recipientEmail = "Please enter a valid email address";
    }

    if (!emailData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!emailData.body.trim()) {
      newErrors.body = "Email body is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = () => {
    if (!validateForm()) {
      return;
    }

    let emailBody = emailData.body;

    // Convert markdown formatting to HTML if rich text is enabled
    if (enableRichText) {
      emailBody = formatTextToHtml(emailBody);
    }

    const labelData: LabelSentEventCreateRequestDTO = {
      senderEmail: emailData.senderEmail,
      senderName: emailData.senderName,
      receiverEmail: emailData.recipientEmail,
      subject: emailData.subject,
      message: emailBody,
      rmaNumber: rmaData.rmaNumber,
      contactName: rmaData.contactName,
    };

    sendLabel(labelData, {
      onSuccess: () => {
        toast.success("Email sent successfully!");
        onClose();
      },
      onError: (error: any) => {
        console.error("Error sending email:", error);
        toast.error("Failed to send email. Please try again.");
      },
    });
  };

  const handleClose = () => {
    setErrors({});
    setIsPreviewMode(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { maxHeight: "90vh" },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Send Email</Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Email Form Fields */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Box sx={{ flex: "1 1 45%", minWidth: "250px" }}>
              <TextField
                fullWidth
                label="Sender Name"
                value={emailData.senderName}
                onChange={(e) => setEmailData((prev) => ({ ...prev, senderName: e.target.value }))}
                error={!!errors.senderName}
                helperText={errors.senderName}
                size="small"
              />
            </Box>
            <Box sx={{ flex: "1 1 45%", minWidth: "250px" }}>
              <TextField
                fullWidth
                label="Sender Email"
                type="email"
                value={emailData.senderEmail}
                onChange={(e) => setEmailData((prev) => ({ ...prev, senderEmail: e.target.value }))}
                error={!!errors.senderEmail}
                helperText={errors.senderEmail}
                size="small"
              />
            </Box>
          </Box>

          <TextField
            fullWidth
            label="To"
            type="email"
            value={emailData.recipientEmail}
            onChange={(e) => setEmailData((prev) => ({ ...prev, recipientEmail: e.target.value }))}
            error={!!errors.recipientEmail}
            helperText={errors.recipientEmail}
            size="small"
          />

          <TextField
            fullWidth
            label="Subject"
            value={emailData.subject}
            onChange={(e) => setEmailData((prev) => ({ ...prev, subject: e.target.value }))}
            error={!!errors.subject}
            helperText={errors.subject}
            size="small"
          />

          {/* Rich Text Controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <FormControlLabel
              control={
                <Switch checked={enableRichText} onChange={(e) => setEnableRichText(e.target.checked)} size="small" />
              }
              label="Rich Text"
            />

            <FormControlLabel
              control={
                <Switch checked={isPreviewMode} onChange={(e) => setIsPreviewMode(e.target.checked)} size="small" />
              }
              label="Preview"
            />

            {enableRichText && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <Chip label="**Bold**" size="small" variant="outlined" color="primary" />
                <Chip label="*Italic*" size="small" variant="outlined" color="secondary" />
                <Chip label="___Underline___" size="small" variant="outlined" color="info" />
              </Box>
            )}
          </Box>

          {/* Formatting Toolbar */}
          {enableRichText && !isPreviewMode && (
            <Paper elevation={1} sx={{ p: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                <Tooltip title="Bold (Wrap text with **)">
                  <IconButton size="small" onClick={() => insertFormatting("bold")} color="primary">
                    <FormatBold />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Italic (Wrap text with *)">
                  <IconButton size="small" onClick={() => insertFormatting("italic")} color="primary">
                    <FormatItalic />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Underline (Wrap text with ___)">
                  <IconButton size="small" onClick={() => insertFormatting("underline")} color="primary">
                    <FormatUnderlined />
                  </IconButton>
                </Tooltip>

                <Divider orientation="vertical" flexItem />

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Font</InputLabel>
                  <Select value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)} label="Font">
                    {fontOptions.map((font) => (
                      <MenuItem key={font} value={font}>
                        {font}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={selectedFontSize}
                    onChange={(e) => setSelectedFontSize(Number(e.target.value))}
                    label="Size"
                  >
                    {fontSizeOptions.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <input
                  type="color"
                  value={selectedTextColor}
                  onChange={(e) => setSelectedTextColor(e.target.value)}
                  style={{
                    width: 40,
                    height: 32,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                />

                <Tooltip title="Apply Font">
                  <IconButton size="small" onClick={() => insertFormatting("font")} color="primary">
                    F
                  </IconButton>
                </Tooltip>

                <Tooltip title="Apply Font Size">
                  <IconButton size="small" onClick={() => insertFormatting("fontSize")} color="primary">
                    T
                  </IconButton>
                </Tooltip>

                <Tooltip title="Apply Text Color">
                  <IconButton size="small" onClick={() => insertFormatting("color")} color="primary">
                    <FormatColorText />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          )}

          {/* Email Body */}
          {isPreviewMode ? (
            <Paper
              elevation={1}
              sx={{
                p: 2,
                minHeight: 200,
                backgroundColor: "#f9f9f9",
                border: "1px solid #ddd",
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Preview:
              </Typography>
              <Box
                dangerouslySetInnerHTML={{
                  __html: enableRichText ? formatTextToHtml(emailData.body) : emailData.body.replace(/\n/g, "<br />"),
                }}
                sx={{
                  minHeight: 150,
                  "& p": { margin: 0 },
                  "& br": { lineHeight: 1.5 },
                }}
              />
            </Paper>
          ) : (
            <TextField
              id="email-body-textarea"
              fullWidth
              label="Email Body"
              multiline
              rows={8}
              value={emailData.body}
              onChange={(e) => setEmailData((prev) => ({ ...prev, body: e.target.value }))}
              error={!!errors.body}
              helperText={errors.body}
              placeholder={
                enableRichText
                  ? "Use **bold**, *italic*, ___underline___ for formatting..."
                  : "Enter your email content..."
              }
            />
          )}

          {enableRichText && (
            <Alert severity="info" sx={{ mt: 1 }}>
              <Typography variant="body2">
                <strong>Formatting Guide:</strong>
                <br />
                • **Bold text** for bold
                <br />
                • *Italic text* for italics
                <br />
                • ___Underlined text___ for underline
                <br />• Use the toolbar buttons to apply font, size, and color formatting
              </Typography>
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={isPending}>
          Cancel
        </Button>
        <Button onClick={handleSend} variant="contained" disabled={isPending} startIcon={isPending ? <></> : <Send />}>
          {isPending ? "Sending..." : "Send Email"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MailSenderModal;
