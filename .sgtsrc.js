module.exports = {
  endpoint: "https://api.ahera-testing.devtotem.team/graphql",
  apolloHooks: true,
  generateMethods: true,
  customScalars: { Date: "Date" },
  output: "debug/generated.ts"
};
