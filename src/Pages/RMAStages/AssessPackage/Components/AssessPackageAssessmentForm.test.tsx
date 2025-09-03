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

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should show validation error when note exceeds maximum length", () => {
    const longNote = "a".repeat(401); // 401 characters, exceeds 400 limit

    renderWithQueryClient(<AssessPackageAssessmentForm {...defaultProps} note={longNote} />);

    // Check if validation error message is displayed
    expect(screen.getByText(/Note exceeds maximum length of 400 characters/)).toBeInTheDocument();
  });

  it("should show character count with error color when limit exceeded", () => {
    const longNote = "a".repeat(401);

    renderWithQueryClient(<AssessPackageAssessmentForm {...defaultProps} note={longNote} />);

    // Check if character count shows the exceeded count
    expect(screen.getByText("401/400 characters")).toBeInTheDocument();
  });


});
