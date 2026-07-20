import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api": "https://crud-seven-wine.vercel.app/",
      },
    },
  });
};
