import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

document.documentElement.style.setProperty(
  "--fiber-image",
  `url("${import.meta.env.BASE_URL}fiber-field.jpg")`,
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
