import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import paths from "vite-tsconfig-paths";
import generouted from "@generouted/react-router/plugin";

export default defineConfig({
  plugins: [react(), paths(), generouted()],
  server: {
    port: 8080,
  },
});
