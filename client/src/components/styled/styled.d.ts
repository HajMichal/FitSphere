import "styled-components";
import type { Themes } from "./Themes";
declare module "styled-components" {
  export interface DefaultTheme extends Themes {}
}
