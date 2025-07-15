import { List, Box, Typography } from "@mui/material";
import SideBarItem from "./SideBarItem";
import { sideBarColor } from "../../../Constants/ComponentStyles";
import { SideBarContent } from "./SideBarContent";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import { SideBarMenuName } from "../../../Constants/SideBarMenuNames";
import { Tooltip } from "@mui/material";
interface SideBarListItemsProps {
  toggleDrawer: () => void;
  IsOpen: boolean;
}

export const SideBarListItems: React.FC<SideBarListItemsProps> = ({ toggleDrawer, IsOpen }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBoxClick = () => {
    navigate(SideBarMenuName.dashBoard.route);
  };

  return (
    <List
      component="nav"
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: sideBarColor,
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          width: "100%",
          paddingLeft: "10px",
          paddingRight: "10px",
          borderBottom: "0px solid #000000",
          borderTop: "20px",
        }}
      >
        {IsOpen && (
          <Box>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "28px",
                fontWeight: 600,
                lineHeight: "42px",
                letterSpacing: "-0.01em",
                textAlign: "left",
                width: "100%",
                textWrap: "wrap",
              }}
            >
              RMA Manager
            </Typography>{" "}
          </Box>
        )}
        <IconButton onClick={toggleDrawer}>{IsOpen ? <ChevronLeftIcon /> : <MenuIcon />}</IconButton>
      </Box>
      <Box
        sx={{
          paddingTop: "20px",
          fontFamily: "Inter",
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "24px",
          textAlign: "left",
          backgroundColor: sideBarColor,
        }}
      >
        {SideBarContent.map((item, index) => (
          <SideBarItem
            key={index}
            sideBarLink={item.sideBarLink}
            sidebarIconUrl={item.sidebarIconUrl}
            sideBarText={item.sideBarText}
            level={item.level}
            subitem={item.subitem}
            menuNumber={item.menuNumber}
          />
        ))}
      </Box>
      <Box
        sx={{
          paddingTop: "20px",

          flexGrow: 1,
          cursor: "pointer", // Add pointer cursor to indicate it's clickable
        }}
        onClick={handleBoxClick}
      >
        <Tooltip title="Click to navigate to the dashboard" arrow>
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </Tooltip>
      </Box>
    </List>
  );
};
