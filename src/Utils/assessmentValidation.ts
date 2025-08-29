/**
 * Validates assessment note length
 * @param note - The assessment note to validate
 * @param maxLength - Maximum allowed characters (default: 400)
 * @returns Object with isValid boolean and error message if invalid
 */
export const validateAssessmentNote = (note: string, maxLength: number = 400) => {
  const noteLength = note.length; // Use actual length, not trimmed
  const isValid = noteLength <= maxLength;

  return {
    isValid,
    error: isValid ? null : `Assessment note cannot exceed ${maxLength} characters (currently ${noteLength})`,
    characterCount: noteLength,
    remainingCharacters: maxLength - noteLength,
  };
}; /**
 * Constants for assessment validation
 */
export const ASSESSMENT_VALIDATION = {
  MAX_NOTE_LENGTH: 400,
  WARNING_THRESHOLD: 50, // Show warning when less than 50 characters remaining
} as const;
