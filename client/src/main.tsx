import ReactDOM from "react-dom/client";
import { TrpcProvider } from "./api/TrpcProvider";
import App from "./App";
import { BrowserRouter } from "react-router";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./components/styled/Themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TrpcProvider>
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </TrpcProvider>
);
