import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Cover } from "./screens/Cover";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Cover />
  </StrictMode>,
);
