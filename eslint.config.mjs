import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [

  {rules: {
    'no-console': 'warn', // Permite console.log pero advierte sobre su uso
    'no-unused-vars': 'warn', // Advierte sobre variables no utilizadas
    'semi': ['error', 'always'], // Asegura que siempre se utilicen puntos y comas (como error)
    'quotes': ['error', 'single'], // Asegura que se usen comillas simples (como error)
  }},
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];