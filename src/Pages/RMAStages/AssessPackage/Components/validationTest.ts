import { validateAssessmentNote } from "../../../../Utils/assessmentValidation";

// Simple test function to debug validation
export const testValidation = () => {
  console.log("Testing validation utility...");

  const shortNote = "Short note";
  const longNote = "a".repeat(401); // 401 characters

  const shortResult = validateAssessmentNote(shortNote);
  const longResult = validateAssessmentNote(longNote);

  console.log("Short note (should be valid):", {
    note: shortNote,
    length: shortNote.length,
    result: shortResult,
  });

  console.log("Long note (should be invalid):", {
    note: longNote.substring(0, 50) + "...",
    length: longNote.length,
    result: longResult,
  });

  return { shortResult, longResult };
};

// Call the test immediately when this file is imported
testValidation();
