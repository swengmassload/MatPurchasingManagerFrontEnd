import {  ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Link, useLocation } from "react-router";
import { SideBarItemProps } from "./SideBar/SideBarContent";
import SideBarIcons from "./SideBar/SideBarIcons";
import RenderArrowIcon from "./RenderArrowIcon";
import { useContext } from "react";
import { SideBarContext } from "./SideBar/SideBarContext/SideBarContext";

interface RenderListItemProps {
  expandedSubMenu: boolean;
  item: SideBarItemProps;
}
const RenderListItem = ({ expandedSubMenu, item }: RenderListItemProps) => {
  const location = useLocation();
  const sideCode = location.pathname.split("/");
  const isActive = sideCode[2] === item.sideBarLink;

  const { setSideBarContextValue } = useContext(SideBarContext);

  const setItWasClicked = (item: SideBarItemProps) => {

    setSideBarContextValue((prev) => ({ ...prev, expandedSubMenu: !prev.expandedSubMenu, menuNumber: item.menuNumber }));
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        p: 0,
      }}
    >
      {item.sideBarLink ? (
        <>
          <Link
            to={item.sideBarLink}
            style={{
              textDecoration: "none",
              width: "100%",
            }}
          >
         
              <ListItemButton

                sx={{
                  width: "100%",
                  backgroundColor: isActive ? "black" : "inherit", // apply background for active
                  color: isActive ? "white" : "inherit", // apply color for active
                  "&:hover": { backgroundColor: "black", color: "white" },
                }}
              >
                <ListItemIcon sx={{ minWidth: "unset", pr: "10px" }}>
                  <SideBarIcons url={item.sidebarIconUrl} />
                </ListItemIcon>
                <ListItemText primary={item.sideBarText} />
                <RenderArrowIcon expandedSubMenu={expandedSubMenu} item={item} />
              </ListItemButton>
            
          </Link>
        </>
      ) : (
        <>
         
            <ListItemButton
              onClick={() => setItWasClicked(item)}
              sx={{
                width: "100%",
                "&:hover": { backgroundColor: "black", color: "white" },
              }}
            >
              <ListItemIcon sx={{ minWidth: "unset", pr: "10px" }}>
                <SideBarIcons url={item.sidebarIconUrl} />
              </ListItemIcon>
              <ListItemText primary={item.sideBarText} />
              <RenderArrowIcon expandedSubMenu={expandedSubMenu} item={item} />
            </ListItemButton>
     
        </>
      )}
    </Box>
  );
};

export default RenderListItem;
