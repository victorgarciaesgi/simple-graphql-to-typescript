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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var child_process_1 = require("child_process");
var ora_1 = __importDefault(require("ora"));
var path_1 = __importDefault(require("path"));
var scalarList = {
    ID: 'string',
    String: 'string',
    DateTime: 'Date',
    Int: 'number',
    Float: 'number',
    Upload: 'File',
    Boolean: 'boolean',
    Json: 'string',
};
var generatedTypes = {
    OBJECT: [],
    ENUM: [],
};
var getObjectTypes = function (object, prefix, suffix, removeNodes) {
    var ObjectName = object.name;
    var fieldsKey = object.kind === 'OBJECT' ? 'fields' : 'inputFields';
    var generatedFields = object[fieldsKey].map(function (field) {
        var propertyName = field.name;
        var isOptional = true;
        var isArray = false;
        var isArrayOptional = false;
        var isEdge = false;
        function getFieldInfos(type) {
            if (propertyName === 'edges')
                isEdge = true;
            if (type.kind === 'NON_NULL' || type.kind === 'LIST') {
                if (type.kind === 'LIST') {
                    isArray = true;
                    if (isOptional)
                        isArrayOptional = true;
                }
                if (type.kind === 'NON_NULL' && !isArrayOptional)
                    isOptional = false;
                return getFieldInfos(type.ofType);
            }
            else {
                if (type.kind === 'SCALAR') {
                    return scalarList[type.name];
                }
                return (prefix ? prefix : '') + type.name + (suffix ? suffix : '');
            }
        }
        var typeName = getFieldInfos(field.type);
        var generatedProperty = "" + propertyName + (isOptional ? '?' : '') + ": " + typeName + (removeNodes && isEdge ? '["node"]' : '') + (isArray ? '[]' : '') + ";";
        return generatedProperty;
    });
    var generatedInterface = "export interface " + (prefix ? prefix : '') + ObjectName + (suffix ? suffix : '') + " {\n        " + generatedFields.join('\n') + "\n      }\n    ";
    generatedTypes.OBJECT.push(generatedInterface);
};
var getEnumTypes = function (object, prefix, suffix) {
    var ObjectName = object.name;
    var generatedFields = object.enumValues.map(function (field) {
        return "| '" + field.name + "'";
    });
    var generatedInterface = "export type " + (prefix ? prefix : '') + ObjectName + (suffix ? suffix : '') + " = \n        " + generatedFields.join('\n') + "\n    ";
    generatedTypes.ENUM.push(generatedInterface);
};
exports.generate = function (origin, outfile, prefix, suffix, removeNodes, customScalars) {
    return new Promise(function (resolve, reject) {
        if (customScalars) {
            scalarList = __assign({}, scalarList, customScalars);
        }
        var transpile = ora_1.default('Transpiling GraphQL schema to Typescript interfaces');
        transpile.start();
        try {
            var schemaTypes = require(origin).__schema.types;
            schemaTypes.forEach(function (item) {
                if (!/^_{2}/.test(item.name)) {
                    if (item.kind === 'OBJECT' || item.kind === 'INPUT_OBJECT') {
                        getObjectTypes(item, prefix, suffix, removeNodes);
                    }
                    else if (item.kind === 'ENUM') {
                        getEnumTypes(item, prefix, suffix);
                    }
                }
            });
        }
        catch (e) {
            transpile.text = e.message;
            transpile.fail();
            reject();
        }
        transpile.text = "Transpiling done";
        transpile.succeed();
        var save = ora_1.default('Saving file...');
        save.start();
        var fileTemplate = "\n    // *******************************************************\n    // *******************************************************\n    //\n    // GENERATED FILE, DO NOT MODIFY\n    //\n    // Made by Victor Garcia \u00AE\n    // https://github.com/victorgarciaesgi\n    // *******************************************************\n    // *******************************************************\n\n    " + generatedTypes.OBJECT.join('\n') + "\n    " + generatedTypes.ENUM.join('\n') + "\n";
        fs_1.default.writeFile(path_1.default.resolve(__dirname, outfile), fileTemplate, function (err) {
            if (err) {
                save.text = err.message;
                save.fail();
            }
            else {
                var prettier = child_process_1.spawn(path_1.default.resolve(__dirname, '../node_modules/.bin/prettier'), [
                    '--config',
                    path_1.default.resolve(__dirname, '../.prettierrc'),
                    '--write',
                    outfile,
                ]);
                prettier.on('error', function (err) {
                    save.text = err.message;
                    save.fail();
                    reject();
                });
                prettier.on('exit', function () {
                    save.text = "Models saved at " + chalk_1.default.bold("" + outfile);
                    save.succeed();
                    resolve();
                    console.log('');
                });
            }
        });
    });
};
