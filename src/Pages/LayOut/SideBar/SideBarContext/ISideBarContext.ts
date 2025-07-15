import { Dispatch, SetStateAction } from "react";
import { SideBarContextType } from "./SideBarContextType";

export interface ISideBarContext {
  sideBarContextValue: SideBarContextType;
  setSideBarContextValue: Dispatch<SetStateAction<SideBarContextType>>;
}
