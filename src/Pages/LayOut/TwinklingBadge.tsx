import { Box } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

// Twinkling animation keyframes
const twinkle = keyframes`
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
`;

// Styled component for the twinkling staging badge
export const TwinklingBadge = styled(Box)(() => ({
  backgroundColor: "#a7361d",
  color: "white",
  padding: "8px 16px",
  borderRadius: "50px",
  fontSize: "14px",
  fontWeight: "bold",
  textAlign: "center",
  animation: `${twinkle} 2s ease-in-out infinite`,
  border: "2px solid rgba(255, 255, 255, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "200px",
  height: "40px",
}));
