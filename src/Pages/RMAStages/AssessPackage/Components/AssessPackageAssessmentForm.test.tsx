import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AssessPackageAssessmentForm from "./AssessPackageAssessmentForm";

describe("AssessPackageAssessmentForm - Note Validation", () => {
  const defaultProps = {
    products: [],
    onProductsChange: vi.fn(),
    note: "",
    setNote: vi.fn(),
    isCompleted: false,
    setIsCompleted: vi.fn(),
    errors: {},
    onPreview: vi.fn(),
    onSave: vi.fn(),
    isSaving: false,
  };

  it("should show validation error when note exceeds maximum length", () => {
    const longNote = "a".repeat(401); // 401 characters, exceeds 400 limit

    render(<AssessPackageAssessmentForm {...defaultProps} note={longNote} />);

    // Check if validation error message is displayed
    expect(screen.getByText(/Note exceeds maximum length of 400 characters/)).toBeInTheDocument();
  });

  it("should show character count with error color when limit exceeded", () => {
    const longNote = "a".repeat(401);

    render(<AssessPackageAssessmentForm {...defaultProps} note={longNote} />);

    // Check if character count shows the exceeded count
    expect(screen.getByText("401/400 characters")).toBeInTheDocument();
  });

  it("should not show validation error when note is within limit", () => {
    const shortNote = "This is a short note";

    render(<AssessPackageAssessmentForm {...defaultProps} note={shortNote} />);

    // Error message should not be present
    expect(screen.queryByText(/Note exceeds maximum length/)).not.toBeInTheDocument();
  });

  it("should disable save button when note exceeds limit", () => {
    const longNote = "a".repeat(401);

    render(
      <AssessPackageAssessmentForm
        {...defaultProps}
        note={longNote}
        products={[{ id: 1 }]} // Add a product so only note validation matters
      />
    );

    // Save button should be disabled
    const saveButton = screen.getByRole("button", { name: /Save/ });
    expect(saveButton).toBeDisabled();
  });

  it("should allow typing beyond limit and call setNote", () => {
    const setNoteMock = vi.fn();

    render(<AssessPackageAssessmentForm {...defaultProps} setNote={setNoteMock} />);

    const textarea = screen.getByPlaceholderText("Enter any notes for this assessment...");
    const longText = "a".repeat(450);

    fireEvent.change(textarea, { target: { value: longText } });

    // setNote should be called with the full text (not truncated)
    expect(setNoteMock).toHaveBeenCalledWith(longText);
  });
});
