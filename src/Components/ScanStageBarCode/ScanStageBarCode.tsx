import { Box, TextField, Typography } from "@mui/material";
import { SimpleBoxborder } from "../Common/SimpleBoxborder";
import { useEffect, useRef, useState } from "react";
import { PlayInvalidSelectionSound } from "../../assets";
import { MenuName, SideBarMenuName } from "../../Constants/SideBarMenuNames";

interface ScanStageBarCodeProps {
  mt?: number;
  textfieldMarginTop?: number;
  pt?: number;
  width?: number;
  height?: number;
  caption?: string;
  fontSize?: number;
  textfieldWidth?: number;
  setSpecialBarcodeMenu: React.Dispatch<React.SetStateAction<MenuName|undefined >>;
}

const ScanStageBarCode = ({
  mt = 8,
  pt = 6,
  textfieldMarginTop = 3,
  width,
  height,
  fontSize,
  caption = "Scan the barcode at your station",
  textfieldWidth ,
  setSpecialBarcodeMenu,
}: ScanStageBarCodeProps) => {
  const [barcode, setBarCode] = useState("");
  const barRef = useRef<HTMLInputElement>(null) ;
  useEffect(() => {
    if (barRef.current) {
      barRef.current.focus();
    }
  }, []);
  const handleSubmitScannedProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   if (!barcode) return;

    const scannedCode = barcode;
   

    if (isValidBarcode(scannedCode) ) {
        const menu = SideBarMenuName.getStageByBarCode(scannedCode);
       if (menu) {setSpecialBarcodeMenu(()=>menu)} else {
        handleInvalidBarcode();
      }
    } else {
      handleInvalidBarcode();
    }
  };

  const isValidBarcode = (scannedCode: string) => {
   
    //return scannedCode.startsWith(SideBarMenuName.stageBarCodePrefix) || SideBarMenuName.isBarcodeInStageBarCodes(scannedCode);
    return SideBarMenuName.isBarcodeInStageBarCodes(scannedCode);
  };

  const handleInvalidBarcode = () => {
  
    PlayInvalidSelectionSound();
    if (barRef.current) {
      barRef.current.value = "";
      barRef.current.focus();
    }
  };


  return (
    <Box
      sx={{
        alignContent: "center",
        justifyContent: "center",
        pt: pt,
        mt: mt,

        ...SimpleBoxborder,
        width: width,
        height: height,
      }}
    >
      <form onSubmit={(e) => handleSubmitScannedProduct(e)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: {fontSize} ,
              fontWeight: "600",
              lineHeight: "1.5",
              letterSpacing: "-0.01em",
              textAlign: "center",
            }}
          >
            {caption}
          </Typography>
          <TextField
            placeholder="Scan Barcode"
            inputRef={barRef}
            onChange={(event) => {
              setBarCode(event.target.value);
            }}
            sx={{
              mt: textfieldMarginTop,
              width: textfieldWidth,
              height: "100%",
              fontSize: "32px",
              fontWeight: 800,
              lineHeight: "38.73px",
              letterSpacing: "-0.015em",
              textAlign: "center",
            }}
          />
        </Box>

      </form>
    </Box>
  );
};

export default ScanStageBarCode;
