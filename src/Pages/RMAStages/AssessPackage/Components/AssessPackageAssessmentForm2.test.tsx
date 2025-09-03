import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import AssessPackageAssessmentForm from "./AssessPackageAssessmentForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("./ProductSection", () => ({
  default: () => <div data-testid="mock-product-section" />,
}));

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("AssessPackageAssessmentForm Contd - Note Validation", () => {
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

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should not show validation error when note is within limit", () => {
    const shortNote = "This is a short note";

    renderWithQueryClient(<AssessPackageAssessmentForm {...defaultProps} note={shortNote} />);

    // Error message should not be present
    expect(screen.queryByText(/Note exceeds maximum length/)).not.toBeInTheDocument();
  });

  it("should disable save button when note exceeds limit", () => {
    const longNote = "a".repeat(401);
    // Use a minimal valid product object
    const minimalProduct = { id: 1, name: "Test Product" };

    renderWithQueryClient(
      <AssessPackageAssessmentForm {...defaultProps} note={longNote} products={[minimalProduct]} />
    );

    // Save button should be disabled
    const saveButton = screen.getByRole("button", { name: /Save/ });
    expect(saveButton).toBeDisabled();
  });

  it("should allow typing beyond limit and call setNote", () => {
    const setNoteMock = vi.fn();

    renderWithQueryClient(<AssessPackageAssessmentForm {...defaultProps} setNote={setNoteMock} />);

    const textarea = screen.getByPlaceholderText("Enter any notes for this assessment...");
    const longText = "a".repeat(450);

    fireEvent.change(textarea, { target: { value: longText } });

    // setNote should be called with the full text (not truncated)
    expect(setNoteMock).toHaveBeenCalledWith(longText);
  });
});
