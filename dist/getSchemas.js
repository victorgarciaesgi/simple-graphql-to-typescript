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
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var ora_1 = __importDefault(require("ora"));
var query = __importStar(require("querystringify"));
var introspectionQuery_1 = require("graphql/utilities/introspectionQuery");
var buildClientSchema_1 = require("graphql/utilities/buildClientSchema");
var schemaPrinter_1 = require("graphql/utilities/schemaPrinter");
exports.downloadSchema = function (endpoint, header) { return __awaiter(void 0, void 0, void 0, function () {
    var download, formatedHeaders, schema, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                download = ora_1.default("\u2B07\uFE0F Downloading schemas from " + chalk_1.default.blue(endpoint)).start();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                formatedHeaders = getHeadersFromInput(header);
                formatedHeaders = __assign(__assign({}, formatedHeaders), { 'Content-Type': 'application/json' });
                return [4, getRemoteSchema(endpoint, {
                        method: 'POST',
                        json: true,
                        headers: formatedHeaders,
                    })];
            case 2:
                schema = _a.sent();
                if (schema.status === 'err') {
                    download.fail();
                    return [2, Promise.reject(schema.message)];
                }
                else {
                    download.text = '📐 Schemas succesfully downloaded';
                    download.succeed();
                    return [2, schema.schema];
                }
                return [3, 4];
            case 3:
                e_1 = _a.sent();
                download.text = e_1;
                download.fail();
                console.log(e_1.message);
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
function getHeadersFromInput(header) {
    var _a;
    switch (typeof header) {
        case 'string': {
            var keys = query.parse(header);
            var key = Object.keys(keys)[0];
            return _a = {}, _a[key] = keys[key], _a;
        }
        case 'object': {
            return header.map(function (header) {
                var _a;
                var keys = query.parse(header);
                var key = Object.keys(keys)[0];
                return _a = {}, _a[key] = keys[key], _a;
            });
        }
        default: {
            return {};
        }
    }
}
function getRemoteSchema(endpoint, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, errors, schema, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4, node_fetch_1.default(endpoint, {
                            method: options.method,
                            headers: options.headers,
                            body: JSON.stringify({ query: introspectionQuery_1.introspectionQuery }),
                        }).then(function (res) { return res.json(); })];
                case 1:
                    _a = _b.sent(), data = _a.data, errors = _a.errors;
                    if (errors) {
                        return [2, { status: 'err', message: JSON.stringify(errors, null, 2) }];
                    }
                    if (options.json) {
                        return [2, {
                                status: 'ok',
                                schema: JSON.stringify(data, null, 2),
                            }];
                    }
                    else {
                        schema = buildClientSchema_1.buildClientSchema(data);
                        return [2, {
                                status: 'ok',
                                schema: schemaPrinter_1.printSchema(schema),
                            }];
                    }
                    return [3, 3];
                case 2:
                    err_1 = _b.sent();
                    return [2, { status: 'err', message: err_1.message }];
                case 3: return [2];
            }
        });
    });
}
