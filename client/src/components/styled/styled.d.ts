import "styled-components";
import type { Themes } from "./Themes";
declare module "styled-components" {
  export type DefaultTheme = Themes;
}
