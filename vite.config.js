import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: base must match your repo name EXACTLY
export default defineConfig({
  plugins: [react()],
  base: "/Namrath-Lakkadi-Portfolio/",
});

