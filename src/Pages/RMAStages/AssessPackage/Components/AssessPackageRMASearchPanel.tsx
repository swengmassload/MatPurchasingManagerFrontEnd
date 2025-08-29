
import RMASearchSection from "./RMASearchSection";

interface AssessPackageRMASearchPanelProps {
  rmaNumber: string;
  onRmaNumberChange: (val: string) => void;
  onSearch: () => void;
  isSearching: boolean;
  searchResults: any;
  searchError: string;
}

const AssessPackageRMASearchPanel = ({
  rmaNumber,
  onRmaNumberChange,
  onSearch,
  isSearching,
  searchResults,
  searchError,
}: AssessPackageRMASearchPanelProps) => (
  <RMASearchSection
    rmaNumber={rmaNumber}
    onRmaNumberChange={onRmaNumberChange}
    onSearch={onSearch}
    isSearching={isSearching}
    searchResults={searchResults}
    searchError={searchError}
  />
);

export default AssessPackageRMASearchPanel;
