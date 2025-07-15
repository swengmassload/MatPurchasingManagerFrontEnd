import { Box, TextField, Typography } from "@mui/material";
import { SimpleBoxborder } from "../Common/SimpleBoxborder";
import { useEffect, useRef, useState } from "react";

import { BarCodePrefix } from "../../Constants/BarCodePrefix";

interface ScanBarCodeProps {
  mt?: number;
  textfieldMarginTop?: number;
  pt?: number;
  width?: number;
  height?: number;
  caption?: string;
  fontSize?: number;
  setScannedProductId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSpecialBarcode?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setNewItemScanned: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScanBarCode = ({
  mt = 8,
  pt = 6,
  textfieldMarginTop = 3,
  width,
  height,
  fontSize,
  caption = "Scan the barcode at your piece",
  setScannedProductId,
  setSpecialBarcode,
  setNewItemScanned,
}: ScanBarCodeProps) => {
  const [barcode, setBarCode] = useState("");
  const barRef = useRef<HTMLInputElement>(null) 
  const handleSubmitScannedProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (barcode) {
   
      const scannedCode = barcode;
      if (scannedCode.startsWith(BarCodePrefix.SpecialBarCode) && setSpecialBarcode) {
        const specialCode = scannedCode;
        setSpecialBarcode(specialCode);
      } else {
        if (setScannedProductId) {
        
          setScannedProductId(scannedCode);
        }
        setNewItemScanned((prev) => !prev);
        if (barRef.current) {
       
          barRef.current.value = "";
          barRef.current?.focus();
        } 
      }
    }
  };
  useEffect(() => {
    if (barRef.current) {
      barRef.current.focus();
    }
  }, []);
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
              fontSize: fontSize,
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
              width: "100%",
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

export default ScanBarCode;
