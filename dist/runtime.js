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
Object.defineProperty(exports, "__esModule", { value: true });
var generateModel_1 = require("./generateModel");
var path_1 = __importDefault(require("path"));
var getSchemas_1 = require("./getSchemas");
var chalk_1 = __importDefault(require("chalk"));
function sgtsGenerate(_a) {
    var endpoint = _a.endpoint, json = _a.json, _b = _a.output, output = _b === void 0 ? './generated.ts' : _b, customScalars = _a.customScalars, header = _a.header, prefix = _a.prefix, removeNodes = _a.removeNodes, suffix = _a.suffix;
    return __awaiter(this, void 0, void 0, function () {
        var schema, JSONschema, outputPath, formatedFile, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    schema = void 0;
                    if (!endpoint) return [3, 2];
                    return [4, getSchemas_1.downloadSchema(endpoint, header)];
                case 1:
                    JSONschema = _c.sent();
                    schema = JSON.parse(JSONschema);
                    return [3, 3];
                case 2:
                    if (json) {
                        schema = require(path_1.default.resolve(process.cwd(), json));
                    }
                    else {
                        console.warn(chalk_1.default.yellow('\n ⚠️ You need to either provite a source url or a path to your json schema file'));
                        return [2];
                    }
                    _c.label = 3;
                case 3:
                    outputPath = path_1.default.resolve(process.cwd(), output);
                    return [4, generateModel_1.generate(schema, outputPath, prefix, suffix, removeNodes, customScalars)];
                case 4:
                    formatedFile = _c.sent();
                    return [2, formatedFile];
                case 5:
                    e_1 = _c.sent();
                    Promise.reject(e_1);
                    console.log(e_1);
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
exports.sgtsGenerate = sgtsGenerate;
