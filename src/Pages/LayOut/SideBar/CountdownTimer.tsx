import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface CountdownTimerProps {
  initialTimeMs: number;
  onExpire?: () => void;
}
const TimeB4Showing = 30;
const TimeB4Red = 10;

const CountdownTimer: React.FC<CountdownTimerProps> = ({ initialTimeMs, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeMs);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime <= 0) {
          clearInterval(timer);
          if (onExpire) {
            // Use setTimeout to avoid calling onExpire during render
            setTimeout(() => onExpire(), 0);
          }
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onExpire]);

  // Convert milliseconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <>
      {TimeB4Showing > minutes && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeIcon fontSize="small" sx={{ color: minutes < TimeB4Red ? "error.main" : "inherit" }} />
          <Typography
            sx={{
              color: minutes < TimeB4Red ? "error.main" : "inherit",
              fontSize: minutes < TimeB4Red ? "20px" : "small",
              fontWeight: minutes < TimeB4Red ? "bold" : "normal",
            }}
          >
            Session expires in: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default CountdownTimer;
