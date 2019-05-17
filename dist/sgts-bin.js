#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var runtime_1 = require("./runtime");
var sgts = function () {
    commander_1.default
        .version(require('../package.json').version)
        .option('-e, --endpoint <endpoint>', 'GraphQl Api endpoint')
        .option('-j, --json <json>', 'Json file of your GraphQL Api schema')
        .option('-o, --output <output>', 'Output path of your generated file')
        .option('-head, --header <header>', 'Additional header option to fetch your schema from endpoint')
        .option('-p, --prefix <prefix>', 'Add prefix to all your types (ex: User becomes IUser with --suffix I)')
        .option('-s, --suffix <suffix>', 'Add suffix to all your types (ex: User becomes UserModel with --suffix Model)')
        .option('-rmNodes, --removeNodes', 'Remove node property from all [edges] results')
        .option('--customScalars <scalars>', 'Provide your custum scalars in format [{"myScalar": "MyType"} ...]')
        .parse(process.argv);
    var endpoint = commander_1.default.endpoint, json = commander_1.default.json, output = commander_1.default.output, customScalars = commander_1.default.customScalars, header = commander_1.default.header, prefix = commander_1.default.prefix, removeNodes = commander_1.default.removeNodes, suffix = commander_1.default.suffix;
    runtime_1.sgtsGenerate({ endpoint: endpoint, json: json, output: output, customScalars: customScalars, header: header, prefix: prefix, removeNodes: removeNodes, suffix: suffix });
};
sgts();