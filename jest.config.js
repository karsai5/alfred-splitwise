module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  modulePathIgnorePatterns: ["dist"]
};
