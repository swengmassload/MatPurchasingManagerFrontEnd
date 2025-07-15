import { SideBarItemProps } from "./SideBar/SideBarContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface RenderArrowIconProps {
  expandedSubMenu: boolean;
  item: SideBarItemProps;
}

 const RenderArrowIcon = ({
  expandedSubMenu,
  item,
}: RenderArrowIconProps) => {
  let value = <></>;
  if (!item.subitem) {
    value = <></>;
  } else if (expandedSubMenu) {
    value = <KeyboardArrowDownIcon />;
  } else {
    value = <KeyboardArrowUpIcon />;
  }

  return ( value );
};
export default RenderArrowIcon;