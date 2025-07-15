import React from 'react';
import CustomDialog from './CustomDialog'; 
import ViewPdf from './ViewPdf'; 
//import ImageViewer from './ImageViewer';

interface PrintDialogDisplayProps {
  isOpen: boolean;
  handleCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
  fileUrl: string;
  pageTitle?: string;
  paperHeight?: string;
  
}

const PrintDialogDisplay: React.FC<PrintDialogDisplayProps> = ({
  isOpen,
  handleCloseDialog,
  fileUrl,
  pageTitle="",
  paperHeight="800px",
}) => {
  return (
    <CustomDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} pageTitle={pageTitle}>
      <ViewPdf
        fileUrl={fileUrl}
        handleCloseDialog={handleCloseDialog}
        paperHeight={paperHeight}
      />

    </CustomDialog>
  );
};

export default PrintDialogDisplay;