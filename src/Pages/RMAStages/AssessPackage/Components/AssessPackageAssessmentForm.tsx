import { Box, Stack, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import ProductSection from "./ProductSection";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { validateAssessmentNote, ASSESSMENT_VALIDATION } from "../../../../Utils/assessmentValidation";

interface AssessPackageAssessmentFormProps {
  products: any[];
  onProductsChange: (products: any[]) => void;
  note: string;
  setNote: (note: string) => void;
  isCompleted: boolean;
  setIsCompleted: (val: boolean) => void;
  errors: { products?: string; note?: string };
  onPreview: () => void;
  onSave: () => void;
  isSaving: boolean;
}

const AssessPackageAssessmentForm = ({
  products,
  onProductsChange,
  note,
  setNote,
  isCompleted,
  setIsCompleted,
  errors,
  onPreview,
  onSave,
  isSaving,
}: AssessPackageAssessmentFormProps) => {
  const noteValidation = validateAssessmentNote(note);
  const remainingChars = noteValidation.remainingCharacters;


  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    setNote(newValue);


  };

  const canSave = products.length > 0 && noteValidation.isValid && !errors.products && !errors.note;

  return (
    <Stack spacing={3} sx={{ mt: 3 }}>
      <ProductSection products={products} onProductsChange={onProductsChange} error={errors.products} />
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <label htmlFor="assessment-note" style={{ fontWeight: "bold" }}>
            Assessment Note:
          </label>
          <Typography
            variant="caption"
            color={
              remainingChars < ASSESSMENT_VALIDATION.WARNING_THRESHOLD
                ? remainingChars < 0
                  ? "error"
                  : "warning"
                : "text.secondary"
            }
            sx={{ fontSize: "0.75rem" }}
          >
            {noteValidation.characterCount}/{ASSESSMENT_VALIDATION.MAX_NOTE_LENGTH} characters
          </Typography>
        </Box>
        <textarea
          id="assessment-note"
          value={note}
          onChange={handleNoteChange}
          rows={3}
          style={{
            width: "100%",
            marginTop: 8,
            padding: 8,
            fontSize: 16,
            borderColor: !noteValidation.isValid ? "#f44336" : "#ccc",
            borderWidth: !noteValidation.isValid ? "2px" : "1px",
            borderStyle: "solid",
            borderRadius: "4px",
            backgroundColor: !noteValidation.isValid ? "#fff5f5" : "white",
            resize: "vertical",
          }}
          placeholder="Enter any notes for this assessment..."
        />
        {errors.note && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block", fontWeight: "bold" }}>
            ❌ SERVER ERROR: {errors.note}
          </Typography>
        )}
        {!noteValidation.isValid && (
          <Typography variant="caption" color="error" sx={{ mt: 0.5, display: "block", fontWeight: "bold" }}>
            ❌ CLIENT ERROR: Note exceeds maximum length of {ASSESSMENT_VALIDATION.MAX_NOTE_LENGTH} characters
          </Typography>
        )}

      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2, mt: 4 }}>
        <FormControlLabel
          control={
            <Checkbox checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)} color="primary" />
          }
          label="Mark as Completed"
          sx={{ mr: 2 }}
        />
        <Button
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={onPreview}
          disabled={products.length === 0 || !noteValidation.isValid}
          sx={{ minWidth: 120 }}
        >
          Preview
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={onSave}
          disabled={isSaving || !canSave}
          sx={{ minWidth: 140 }}
        >
          {isSaving ? "Saving..." : `Save ${isCompleted ? "Completed" : "Draft"}`}
        </Button>
      </Box>
    </Stack>
  );
};

export default AssessPackageAssessmentForm;
