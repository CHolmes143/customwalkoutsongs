import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  { ignores: ["generated/**", ".next/**"] },
  ...nextVitals,
];

export default eslintConfig;
