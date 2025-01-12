import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface RegistrationContextType {
  code: string[];
  setCode: Dispatch<SetStateAction<string[]>>;
}
export const RegistrationContext = createContext<RegistrationContextType>({
  code: Array(6).fill(""),
  setCode: () => {},
});

export const useRegistrationContext = () => useContext(RegistrationContext);
