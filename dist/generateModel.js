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
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ora_1 = __importDefault(require("ora"));
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
    METHODS_ARGS: [],
};
var transpile = ora_1.default('🔄 Transpiling GraphQL schema to Typescript interfaces');
var getEnumTypes = function (object, prefix, suffix) {
    var ObjectName = object.name;
    var generatedFields = object.enumValues.map(function (field) {
        return "| '" + field.name + "'";
    });
    var generatedInterface = "type " + (prefix ? prefix : '') + ObjectName + (suffix ? suffix : '') + " = \n        " + generatedFields.join('\n') + "\n    ";
    return generatedInterface;
};
exports.generate = function (schema, prefix, suffix, customScalars) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var schemaTypes, QueryType_1, MutationType_1, listQueries, listMutations, signature, modelsTemplate;
        return __generator(this, function (_a) {
            if (customScalars) {
                exports.scalarList = __assign(__assign({}, exports.scalarList), customScalars);
            }
            transpile.start();
            try {
                schemaTypes = schema.__schema.types;
                QueryType_1 = schema.__schema.queryType.name;
                MutationType_1 = schema.__schema.mutationType.name;
                listQueries = schema.__schema.types.find(function (f) { return f.name === QueryType_1; }).fields;
                listMutations = schema.__schema.types.find(function (f) { return f.name === MutationType_1; }).fields;
                schemaTypes.forEach(function (item) {
                    if (!/^_{1,2}/.test(item.name)) {
                        if (['OBJECT', 'INPUT_OBJECT', 'INTERFACE'].includes(item.kind)) {
                            var generatedInterface = helpers_1.getObjectTSInterfaces(item, prefix, suffix);
                            generatedTypes.OBJECT.push("export " + generatedInterface);
                        }
                        else if (item.kind === 'ENUM') {
                            var enumTypes = getEnumTypes(item, prefix, suffix);
                            generatedTypes.ENUM.push("export " + enumTypes);
                        }
                    }
                });
                __spread(listQueries, listMutations).forEach(function (item) {
                    if (!/^_{1,2}/.test(item.name)) {
                        var generatedInterface = helpers_1.getQueriesArgsTSInterfaces(item, prefix, suffix);
                        generatedTypes.METHODS_ARGS.push("export " + generatedInterface);
                    }
                });
            }
            catch (e) {
                transpile.fail('Transpiling failed');
                console.log(e);
                reject(e);
                return [2];
            }
            transpile.succeed("\uD83D\uDD8B Transpiling done");
            signature = "\n      /* eslint-disable */\n      /* tslint-disable */\n      // *******************************************************\n      // *******************************************************\n      //\n      // GENERATED FILE, DO NOT MODIFY\n      //\n      // Made by Victor Garcia \u00AE\n      //\n      // https://github.com/victorgarciaesgi\n      // *******************************************************\n      // *******************************************************\n      // \uD83D\uDC99";
            modelsTemplate = "\n      " + signature + "\n\n      " + generatedTypes.OBJECT.join('\n') + "\n      " + generatedTypes.ENUM.join('\n') + "\n      " + generatedTypes.METHODS_ARGS.join('\n') + "\n    ";
            resolve(modelsTemplate);
            return [2];
        });
    }); });
};
