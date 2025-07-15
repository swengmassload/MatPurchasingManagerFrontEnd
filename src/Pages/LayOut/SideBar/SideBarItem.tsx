import { Box } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import { SideBarItemProps } from "./SideBarContent";
import { useContext } from "react";
import RenderListItem from "../RenderListItem";
import { SideBarContext } from "./SideBarContext/SideBarContext";

const SideBarItem = ({ sideBarLink, sidebarIconUrl, sideBarText, subitem, level, menuNumber }: SideBarItemProps) => {
  const { sideBarContextValue } = useContext(SideBarContext);

  const detail = level === 1;

  return (
    <>
      <ListItem
       component="div" // Change from default 'li' to 'div'
        sx={{
          p: "0px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            paddingLeft: detail ? "20px" : 0,
            whiteSpace: "normal",
            wordWrap: "break-word",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            textOverflow: "ellipsis",
            minWidth: 0,
          }}
        >
          <RenderListItem
            expandedSubMenu={sideBarContextValue.expandedSubMenu}
            item={{ sideBarLink, sidebarIconUrl, sideBarText, subitem, level, menuNumber }}
          />

          {subitem &&
            sideBarContextValue.expandedSubMenu &&
            sideBarContextValue.menuNumber === menuNumber &&
            subitem.map((subItem, index) => (
              <SideBarItem
                key={index}
                sideBarLink={subItem.sideBarLink}
                sidebarIconUrl={subItem.sidebarIconUrl}
                sideBarText={subItem.sideBarText}
                subitem={subItem.subitem}
                level={subItem.level}
                menuNumber={subItem.menuNumber}
              />
            ))}
        </Box>
      </ListItem>
    </>
  );
};

export default SideBarItem;
