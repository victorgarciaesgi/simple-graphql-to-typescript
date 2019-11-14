module.exports = {
  endpoint: "https://api.ahera-testing.devtotem.team/graphql",
  generateMethods: true,
  apolloHooks: true,
  output: "./debug/generated.ts",
  customScalars: { Date: "Date" }
};
