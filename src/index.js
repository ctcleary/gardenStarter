import React, {StrictMode} from "react";
import { createRoot } from "react-dom/client";
import "./styles/normalize.css"
import "./styles/styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);