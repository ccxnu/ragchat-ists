// @ts-check
import globals from "globals";
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
    {
        ignores: ["eslint.config.mjs", "commitlint.config.ts", ".lintstagedrc.mjs", "dist", "node_modules"],
    },
    {
        extends: [eslintConfigPrettier, eslint.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            ecmaVersion: 5,
            sourceType: "module",
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            "simple-import-sort": simpleImportSort,
            prettier: eslintPluginPrettier,
        },
    },
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-floating-promises": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/unbound-method": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "no-useless-constructor": "off",
            "no-unused-vars": "off",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
        },
    },
);
