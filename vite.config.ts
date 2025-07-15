/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config"; // Import from 'vitest/config' for test property support

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Add React plugin for Vite
  ],
  test: {
    globals: true, // Enable global variables for tests
    environment: "jsdom", // Use jsdom for DOM-like testing
    setupFiles: "./src/testconfig/setup.ts", // Path to setup file
    css: true, // Enable CSS parsing for tests
  },

});