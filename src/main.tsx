import { Routes } from "@generouted/react-router";
import { createRoot } from "react-dom/client";
import { SWRConfig } from "swr";
import { localStorageProvider } from "./lib/localstorage";

const root = document.getElementById("root");
if (root == null) throw new Error("Root element not found");

createRoot(root).render(
  <SWRConfig value={{ provider: localStorageProvider }}>
    <Routes />
  </SWRConfig>,
);
