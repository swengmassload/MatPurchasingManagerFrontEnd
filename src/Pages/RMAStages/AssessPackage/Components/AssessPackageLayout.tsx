import { Box, Paper } from "@mui/material";
import AssessPackageRMAListPanel from "./AssessPackageRMAListPanel";
import AssessPackageRMASearchPanel from "./AssessPackageRMASearchPanel";
import AssessPackageAssessmentForm from "./AssessPackageAssessmentForm";
import AssessmentPreviewDialog from "./AssessmentPreviewDialog";
import { RMAResponseDTO, ProductItemDTO } from "../../../../Models/RMAManagerModels/Dto";

interface AssessmentErrors {
  products?: string;
  note?: string;
}

interface AssessPackageLayoutProps {
  rmaList: RMAResponseDTO[];
  onSelectRMA: (rma: RMAResponseDTO) => void;
  selectedRMANumber: number | null;
  isLoadingList: boolean;
  rmaNumber: string;
  onRmaNumberChange: (value: string) => void;
  onSearch: () => void;
  isSearching: boolean;
  searchResults: RMAResponseDTO | null;
  searchError: string;
  products: ProductItemDTO[];
  onProductsChange: (products: ProductItemDTO[]) => void;
  note: string;
  setNote: (note: string) => void;
  isCompleted: boolean;
  setIsCompleted: (completed: boolean) => void;
  errors: AssessmentErrors;
  onPreview: () => void;
  onSave: () => void;
  isSaving: boolean;
  showPreview: boolean;
  handlePreviewClose: () => void;
}

const AssessPackageLayout = ({
  rmaList,
  onSelectRMA,
  selectedRMANumber,
  isLoadingList,
  rmaNumber,
  onRmaNumberChange,
  onSearch,
  isSearching,
  searchResults,
  searchError,
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
  showPreview,
  handlePreviewClose,
}: AssessPackageLayoutProps) => (
  <Box sx={{ maxWidth: 1600, margin: "0 auto", padding: 2 }}>
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
        <AssessPackageRMAListPanel
          rmaList={rmaList}
          onSelectRMA={onSelectRMA}
          selectedRMANumber={selectedRMANumber}
          isLoading={isLoadingList}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <AssessPackageRMASearchPanel
            rmaNumber={rmaNumber}
            onRmaNumberChange={onRmaNumberChange}
            onSearch={onSearch}
            isSearching={isSearching}
            searchResults={searchResults}
            searchError={searchError}
          />
          {searchResults && (
            <AssessPackageAssessmentForm
              products={products}
              onProductsChange={onProductsChange}
              note={note}
              setNote={setNote}
              isCompleted={isCompleted}
              setIsCompleted={setIsCompleted}
              errors={errors}
              onPreview={onPreview}
              onSave={onSave}
              isSaving={isSaving}
            />
          )}
        </Box>
      </Box>
    </Paper>
    {showPreview && searchResults && (
      <AssessmentPreviewDialog
        open={showPreview}
        onClose={handlePreviewClose}
        assessmentData={{
          rmaNumber: searchResults.rmaNumber,
          products: products,
          assessmentStatus: isCompleted,
          notes: note,
        }}
        rmaDetails={{
          companyName: searchResults.companyName,
          contactName: searchResults.contactName,
          customerEmail: searchResults.customerEmail,
          rmaProblemDescription: searchResults.rmaProblemDescription,
        }}
      />
    )}
  </Box>
);

export default AssessPackageLayout;
