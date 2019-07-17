"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var ora_1 = __importDefault(require("ora"));
var path_1 = __importDefault(require("path"));
var prettier = __importStar(require("prettier"));
var createMethods_1 = require("./createMethods");
var helpers_1 = require("./helpers");
exports.scalarList = {
    ID: 'string',
    String: 'string',
    Int: 'number',
    Float: 'number',
    Upload: 'File',
    Boolean: 'boolean',
    Json: 'string',
};
var generatedTypes = {
    METHODS: '',
    OBJECT: [],
    ENUM: [],
};
var getEnumTypes = function (object, prefix, suffix) {
    var ObjectName = object.name;
    var generatedFields = object.enumValues.map(function (field) {
        return "| '" + field.name + "'";
    });
    var generatedInterface = "export type " + (prefix ? prefix : '') + ObjectName + (suffix ? suffix : '') + " = \n        " + generatedFields.join('\n') + "\n    ";
    generatedTypes.ENUM.push(generatedInterface);
};
exports.generate = function (schema, outfile, prefix, suffix, removeNodes, customScalars, generateMethods) {
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var transpile, schemaTypes, methods, e_1, save, fileTemplate, formatedFile, outputfile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (customScalars) {
                        exports.scalarList = __assign({}, exports.scalarList, customScalars);
                    }
                    transpile = ora_1.default('🔄 Transpiling GraphQL schema to Typescript interfaces');
                    transpile.start();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    schemaTypes = schema.__schema.types;
                    if (!generateMethods) return [3, 3];
                    return [4, createMethods_1.createMethods({ schema: schema, prefix: prefix, suffix: suffix })];
                case 2:
                    methods = _a.sent();
                    generatedTypes.METHODS = methods;
                    _a.label = 3;
                case 3:
                    schemaTypes.forEach(function (item) {
                        if (!/^_{2}/.test(item.name)) {
                            if (['OBJECT', 'INPUT_OBJECT', 'INTERFACE'].includes(item.kind)) {
                                var generatedInterface = helpers_1.getObjectTSInterfaces(item, prefix, suffix, removeNodes);
                                generatedTypes.OBJECT.push(generatedInterface);
                            }
                            else if (item.kind === 'ENUM') {
                                getEnumTypes(item, prefix, suffix);
                            }
                        }
                    });
                    return [3, 5];
                case 4:
                    e_1 = _a.sent();
                    transpile.text = 'Transpiling failed';
                    transpile.fail();
                    console.log(e_1);
                    reject(e_1);
                    return [2];
                case 5:
                    transpile.text = "\uD83D\uDD8BTranspiling done";
                    transpile.succeed();
                    save = ora_1.default('Saving file...');
                    save.start();
                    fileTemplate = "\n      /* eslint-disable */\n      /* tslint-disable */\n      // *******************************************************\n      // *******************************************************\n      //\n      // GENERATED FILE, DO NOT MODIFY\n      //\n      // Made by Victor Garcia \u00AE\n      // https://github.com/victorgarciaesgi\n      // *******************************************************\n      // *******************************************************\n      " + generatedTypes.METHODS + "\n      " + generatedTypes.OBJECT.join('\n') + "\n      " + generatedTypes.ENUM.join('\n') + "\n    ";
                    formatedFile = prettier.format(fileTemplate, {
                        config: path_1.default.resolve(__dirname, '../.prettierrc'),
                        semicolons: true,
                        singleQuote: true,
                        printWidth: 100,
                        bracketSpacing: true,
                        parser: 'typescript',
                    });
                    outputfile = path_1.default.resolve(process.cwd(), outfile);
                    fs_1.default.writeFile(outputfile, formatedFile || fileTemplate, function (err) {
                        if (err) {
                            save.text = 'Saving file failed:';
                            save.fail();
                            console.log(err.message);
                        }
                        else {
                            save.text = "\uD83D\uDDC3 Typescript models saved at " + chalk_1.default.bold("" + outfile);
                            save.succeed();
                            resolve(formatedFile);
                        }
                    });
                    return [2];
            }
        });
    }); });
};
