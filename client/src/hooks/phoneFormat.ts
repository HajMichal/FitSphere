import { useCallback } from "react";

export function usePhoneFormat() {
  return useCallback((value: string) => {
    const input = value.replace(/\D/g, "");
    if (input.length <= 3) return input;
    if (input.length <= 6) return `${input.slice(0, 3)}-${input.slice(3)}`;
    return `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 9)}`;
  }, []);
}
