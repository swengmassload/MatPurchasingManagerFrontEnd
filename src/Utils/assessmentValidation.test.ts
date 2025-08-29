import { validateAssessmentNote, ASSESSMENT_VALIDATION } from "./assessmentValidation";

describe("validateAssessmentNote", () => {
  test("should validate note within character limit", () => {
    const shortNote = "This is a short note";
    const result = validateAssessmentNote(shortNote);

    expect(result.isValid).toBe(true);
    expect(result.error).toBe(null);
    expect(result.characterCount).toBe(shortNote.length);
    expect(result.remainingCharacters).toBe(ASSESSMENT_VALIDATION.MAX_NOTE_LENGTH - shortNote.length);
  });

  test("should invalidate note exceeding character limit", () => {
    const longNote = "a".repeat(401); // 401 characters
    const result = validateAssessmentNote(longNote);

    expect(result.isValid).toBe(false);
    expect(result.error).toContain("Assessment note cannot exceed 400 characters");
    expect(result.characterCount).toBe(401);
    expect(result.remainingCharacters).toBe(-1);
  });

  test("should validate note exactly at character limit", () => {
    const exactNote = "a".repeat(400); // Exactly 400 characters
    const result = validateAssessmentNote(exactNote);

    expect(result.isValid).toBe(true);
    expect(result.error).toBe(null);
    expect(result.characterCount).toBe(400);
    expect(result.remainingCharacters).toBe(0);
  });

  test("should handle empty note", () => {
    const emptyNote = "";
    const result = validateAssessmentNote(emptyNote);

    expect(result.isValid).toBe(true);
    expect(result.error).toBe(null);
    expect(result.characterCount).toBe(0);
    expect(result.remainingCharacters).toBe(ASSESSMENT_VALIDATION.MAX_NOTE_LENGTH);
  });

  test("should count actual characters including whitespace", () => {
    const noteWithWhitespace = "   test note   ";
    const result = validateAssessmentNote(noteWithWhitespace);

    expect(result.characterCount).toBe(15); // Full string length including whitespace
    expect(result.isValid).toBe(true);
  });

  test("should work with custom max length", () => {
    const note = "test note";
    const customMaxLength = 5;
    const result = validateAssessmentNote(note, customMaxLength);

    expect(result.isValid).toBe(false);
    expect(result.error).toContain("Assessment note cannot exceed 5 characters");
    expect(result.remainingCharacters).toBe(-4);
  });

  test("should handle notes with special characters", () => {
    const specialNote = "Test with émojis 🎉 and spëcial chars!";
    const result = validateAssessmentNote(specialNote);

    expect(result.isValid).toBe(true);
    expect(result.characterCount).toBe(specialNote.length);
  });
});

describe("ASSESSMENT_VALIDATION constants", () => {
  test("should have correct default values", () => {
    expect(ASSESSMENT_VALIDATION.MAX_NOTE_LENGTH).toBe(400);
    expect(ASSESSMENT_VALIDATION.WARNING_THRESHOLD).toBe(50);
  });
});
