import { createRoot } from "react-dom/client";
import "../config";
import { bootstrapGeneratedSiteAnalytics } from "./analystic.ts";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root was not found.");
}

bootstrapGeneratedSiteAnalytics();

createRoot(container).render(<App />);
