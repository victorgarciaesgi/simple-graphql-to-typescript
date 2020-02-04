import chalk from 'chalk';
import fetch from 'node-fetch';
import ora from 'ora';
import * as query from 'querystringify';
import { introspectionQuery } from 'graphql/utilities/introspectionQuery';
import { buildClientSchema } from 'graphql/utilities/buildClientSchema';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import { GraphQLJSONSchema } from '../models';
import path from 'path';
import fs from 'fs';

export const downloadSchema = async (endpoint: string, header?: string): Promise<string> => {
  const download = ora(`⬇️ Downloading schemas from ${chalk.blue(endpoint)}`).start();
  try {
    let formatedHeaders = getHeadersFromInput(header);
    formatedHeaders = {
      ...formatedHeaders,
      'Content-Type': 'application/json',
    };
    const schema = await getRemoteSchema(endpoint, {
      method: 'POST',
      json: true,
      headers: formatedHeaders,
    });
    if (schema.status === 'err') {
      download.fail();
      return Promise.reject(schema.message);
    } else {
      download.succeed(`📥 Schemas successfully downloaded from ${chalk.blue(endpoint)}`);
      return schema.schema;
    }
  } catch (e) {
    download.fail();
    return Promise.reject(
      'Unable to request from the GraphQL Api, please verify that the server is online'
    );
  }
};

function getHeadersFromInput(header: any): { [key: string]: string } {
  switch (typeof header) {
    case 'string': {
      const keys = query.parse(header);
      console.log(keys);
      const key = Object.keys(keys)[0];
      return { [key]: keys[key] };
    }
    case 'object': {
      return header.map(header => {
        const keys = query.parse(header);
        const key = Object.keys(keys)[0];
        return { [key]: keys[key] };
      });
    }
    default: {
      return {};
    }
  }
}

interface Options {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: { [key: string]: string };
  json?: boolean;
}

async function getRemoteSchema(
  endpoint: string,
  options: Options
): Promise<{ status: 'ok'; schema: string } | { status: 'err'; message: string }> {
  try {
    const { data, errors } = await fetch(endpoint, {
      method: options.method,
      headers: options.headers,
      body: JSON.stringify({ query: introspectionQuery }),
    }).then(res => res.json());

    if (errors) {
      return { status: 'err', message: JSON.stringify(errors, null, 2) };
    }

    if (options.json) {
      return {
        status: 'ok',
        schema: JSON.stringify(data, null, 2),
      };
    } else {
      const schema = buildClientSchema(data);
      return {
        status: 'ok',
        schema: printSchema(schema),
      };
    }
  } catch (err) {
    return Promise.reject();
  }
}

const possibleGraphQLSuffix = ['graphql', 'api', '__graphql', '__api'];

export async function fetchSchemas({
  endpoint,
  header,
  json,
  download,
}: {
  endpoint?: string;
  header?: string;
  json?: string;
  download?: string;
}): Promise<GraphQLJSONSchema | null> {
  try {
    if (endpoint) {
      const graphqlRegxp = /[^/]+(?=\/$|$)/;
      const [result] = graphqlRegxp.exec(endpoint);
      const JSONschema = await downloadSchema(endpoint, header);
      if (download) {
        const outputfile = path.resolve(process.cwd(), download);
        try {
          await fs.writeFileSync(outputfile, JSONschema);
          console.log(chalk.green(`Graphql intropesction schema saved at ${download}`));
        } catch (e) {
          console.error(e);
        }
      }
      return JSON.parse(JSONschema);
    } else if (json) {
      return require(path.resolve(process.cwd(), json));
    } else {
      return null;
    }
  } catch (e) {
    console.log(
      ` Maybe the endpoint is not a GraphQl Api, try to add ${chalk.green(
        possibleGraphQLSuffix.join(', ')
      )} at the end of your url`
    );
    return Promise.reject(e);
  }
}
