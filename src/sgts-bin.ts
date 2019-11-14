#!/usr/bin/env node

import program from "commander";
import { sgtsGenerate } from "./runtime";
import chalk from "chalk";
import path from "path";

const sgts = () => {
  program
    .version(require("../package.json").version)
    .option("generate", "Generate using config file '.sgtsrc.js'")
    .option("-e, --endpoint <endpoint>", "GraphQl Api endpoint")
    .option("-j, --json <json>", "Json file of your GraphQL Api schema")
    .option("-o, --output <output>", "Output path of your generated file")
    .option(
      "-H, --headers <header>",
      "Additional header option to fetch your schema from endpoint"
    )
    .option(
      "-p, --prefix <prefix>",
      "Add prefix to all your types (ex: User becomes IUser with --suffix I)"
    )
    .option(
      "-s, --suffix <suffix>",
      "Add suffix to all your types (ex: User becomes UserModel with --suffix Model)"
    )
    .option(
      "-G, --generateMethods",
      "Generate all your graphQL methods fully typed (Inspired by Prisma)"
    )
    .option(
      "-A, --apolloHooks",
      "Generate useMutation and useQuery hooks typed"
    )
    .option(
      "-J, --jsMode",
      "Generate the methods in Js with declaration files instead of Ts"
    )
    .option("--withGqlQueries", "Add gql query strings to the generated output")
    .option(
      "--customScalars <scalars>",
      'Provide your custum scalars in format {"myScalar": "MyType"...}'
    )
    .parse(process.argv);

  let {
    generate,
    endpoint,
    json,
    output,
    customScalars,
    headers,
    prefix,
    suffix,
    generateMethods,
    jsMode,
    apolloHooks,
    withGqlQueries
  } = program;

  if (generate) {
    try {
      const configFile = require(path.resolve(process.cwd(), ".sgtsrc.js"));
      sgtsGenerate(configFile);
    } catch (e) {
      console.error(
        chalk.red(
          "Couldn't find .sgtsrc.js. Please check that the file is present"
        )
      );
    }
  } else {
    if (customScalars) {
      try {
        customScalars = JSON.parse(customScalars);
      } catch (e) {
        console.error(
          chalk.red(
            'Invalid custom scalars format, expected {"myScalar": "MyType" ...}'
          )
        );
        return;
      }
    }

    try {
      sgtsGenerate({
        endpoint,
        json,
        output,
        customScalars,
        headers,
        prefix,
        suffix,
        generateMethods,
        jsMode,
        apolloHooks,
        withGqlQueries
      });
    } catch (e) {
      return;
    }
  }
};

sgts();
