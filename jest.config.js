module.exports = {
  roots: ["<rootDir>/tests"],

  preset: "ts-jest",
  testEnvironment: "node",

  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],

  testRegex: "(/unit/.*|(\\.|/)(test|spec))\\.tsx?$",

  // Module file extensions for importing
  moduleFileExtensions: ["ts", "js", "json", "node"],
}
