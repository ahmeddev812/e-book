import { createRequire } from "module";

const require = createRequire(import.meta.url);
const config = require("eslint-config-next");

const eslintConfig = [
  ...config,
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
