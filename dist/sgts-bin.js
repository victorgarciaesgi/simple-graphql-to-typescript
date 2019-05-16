#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var generateModel_1 = require("./generateModel");
var path_1 = __importDefault(require("path"));
var getSchemas_1 = require("./getSchemas");
var fs_1 = __importDefault(require("fs"));
var sgts = function () { return __awaiter(_this, void 0, void 0, function () {
    var schemaSource, output, removeNodes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
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
                if (!commander_1.default.endpoint) return [3, 2];
                return [4, getSchemas_1.downloadSchema(commander_1.default.endpoint, commander_1.default.header)];
            case 1:
                _a.sent();
                schemaSource = path_1.default.resolve(__dirname, './__schema.json');
                return [3, 3];
            case 2:
                if (commander_1.default.json) {
                    schemaSource = path_1.default.resolve(process.cwd(), commander_1.default.json);
                }
                else {
                    console.warn('You need to either provite a source url or a path to your json schema file');
                }
                _a.label = 3;
            case 3:
                output = path_1.default.resolve(process.cwd(), commander_1.default.output || 'generated.ts');
                removeNodes = commander_1.default.removeNodes;
                return [4, generateModel_1.generate(schemaSource, output, commander_1.default.prefix, commander_1.default.suffix, removeNodes, commander_1.default.customScalars)];
            case 4:
                _a.sent();
                if (!commander_1.default.json) {
                    fs_1.default.unlink(path_1.default.resolve(__dirname, './__schema.json'), function (err) { });
                }
                return [2];
        }
    });
}); };
sgts();
