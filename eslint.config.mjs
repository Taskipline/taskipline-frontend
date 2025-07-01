import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "next", "prettier"),
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Enable stricter TypeScript rules
      "@typescript-eslint/no-unused-vars": "error",
      // For TypeScript files, we need to enable type-checking rules
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      // React specific
      "react/jsx-uses-vars": "error",
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    rules: {
      // For JavaScript files, enable no-undef
      "no-undef": "error",
      "no-unused-vars": "error",
    },
  },
];

export default eslintConfig;
