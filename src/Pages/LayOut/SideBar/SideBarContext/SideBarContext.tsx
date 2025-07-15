import { createContext, useState } from "react";
import { ISideBarContext } from "./ISideBarContext";
import { SideBarContextType } from "./SideBarContextType";

export const SideBarContextData = {
  expandedSubMenu: false,
  menuNumber: -1,
} as SideBarContextType;

const defaultContext = {
  sideBarContextValue: SideBarContextData,
  setSideBarContextValue: () => {},
} as ISideBarContext;

export const SideBarContext = createContext<ISideBarContext>(defaultContext);

interface SideBarContextProviderProps {
  initialState: SideBarContextType;
  children: React.ReactNode;
}
export const SideBarContextProvider = ({ children, initialState }: SideBarContextProviderProps) => {
  const [sideBarContextValue, setSideBarContextValue] = useState<SideBarContextType>(initialState);
  return (
    <SideBarContext.Provider value={{ sideBarContextValue, setSideBarContextValue }}>
      {children}
    </SideBarContext.Provider>
  );
};
