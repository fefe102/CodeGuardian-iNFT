import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react"
  },
  test: {
    environment: "node",
    include: [
      "packages/**/*.test.ts",
      "packages/**/*.test.tsx",
      "apps/**/*.test.ts",
      "apps/**/*.test.tsx",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
    },
  },
  resolve: {
    alias: {
      "@poi/sdk":
        "<workspace>/packages/sdk/src/index.ts",
      "@poi/agent-runtime":
        "<workspace>/packages/agent-runtime/src/index.ts",
      "@poi/ui":
        "<workspace>/packages/ui/src/index.ts",
    },
  },
});
