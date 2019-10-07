"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateModel_1 = require("./generateModel");
exports.evaluateType = function (field) {
    var propertyName = field.name;
    var isOptional = true;
    var isArray = false;
    var isArrayOptional = false;
    var isEdge = false;
    var isScalar = false;
    var typeName = '';
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
                isScalar = true;
            }
            typeName = type.name;
        }
    }
    getFieldInfos(field.type);
    return {
        isOptional: isOptional,
        isArray: isArray,
        isArrayOptional: isArrayOptional,
        isEdge: isEdge,
        isScalar: isScalar,
        typeName: typeName,
    };
};
exports.getOneTSType = function (_a) {
    var field = _a.field, prefix = _a.prefix, suffix = _a.suffix;
    var _b = exports.evaluateType(field), isScalar = _b.isScalar, typeName = _b.typeName;
    return isScalar
        ? generateModel_1.scalarList[typeName]
        : (prefix ? prefix : '') + typeName + (suffix ? suffix : '');
};
exports.getObjectTSInterfaces = function (object, prefix, suffix) {
    var ObjectName = object.name;
    var fieldsKey = object.kind === 'OBJECT' || object.kind === 'INTERFACE' ? 'fields' : 'inputFields';
    var generatedFields = object[fieldsKey].map(function (field) {
        var propertyName = field.name;
        var _a = exports.evaluateType(field), isArray = _a.isArray, isOptional = _a.isOptional, isScalar = _a.isScalar, typeName = _a.typeName;
        var TStypeName = isScalar
            ? generateModel_1.scalarList[typeName]
            : (prefix ? prefix : '') + typeName + (suffix ? suffix : '');
        var generatedProperty = "" + propertyName + (isOptional ? '?' : '') + ": " + TStypeName + (isArray ? '[]' : '') + ";";
        return generatedProperty;
    });
    var generatedInterface = "interface " + (prefix ? prefix : '') + ObjectName + (suffix ? suffix : '') + " {\n        " + generatedFields.join('\n') + "\n      }\n    ";
    return generatedInterface;
};
exports.getQueriesArgsTSInterfaces = function (object, prefix, suffix) {
    var ObjectName = object.name;
    var parsedSuffix = 'Args' + (suffix ? suffix : '');
    var generatedFields = object.args.map(function (field) {
        var propertyName = field.name;
        var _a = exports.evaluateType(field), isArray = _a.isArray, isOptional = _a.isOptional, isScalar = _a.isScalar, typeName = _a.typeName;
        var TStypeName = isScalar
            ? generateModel_1.scalarList[typeName]
            : (prefix ? prefix : '') + typeName + (suffix ? suffix : '');
        var generatedProperty = "" + propertyName + (isOptional ? '?' : '') + ": " + TStypeName + (isArray ? '[]' : '') + ";";
        return generatedProperty;
    });
    var generatedInterface = "interface " + (prefix ? prefix : '') + ObjectName + (parsedSuffix ? parsedSuffix : '') + " {\n        " + generatedFields.join('\n') + "\n      }\n    ";
    return generatedInterface;
};
exports.getObjectGQLTypesArgs = function (field) {
    var _a = exports.evaluateType(field), isArray = _a.isArray, isArrayOptional = _a.isArrayOptional, isEdge = _a.isEdge, isOptional = _a.isOptional, isScalar = _a.isScalar, typeName = _a.typeName;
    var generatedType = "" + (isArray ? '[' : '') + typeName + (isOptional ? '' : '!') + (isArray ? ']' : '') + (isArrayOptional ? '!' : '');
    return generatedType;
};
exports.buildMethod = function (data, type, prefix, suffix) {
    var hasArgs = data.args.length > 0;
    var methodName = data.name;
    var _a = data.args.reduce(function (acc, arg) {
        var argName = arg.name;
        var type = exports.getObjectGQLTypesArgs(arg);
        var tsArg = exports.getOneTSType({ field: arg, prefix: prefix, suffix: suffix });
        acc.$args.push("$" + argName + ": " + type);
        acc.args.push(argName + ": $" + argName);
        acc.variables.push(argName);
        acc.tsArgs.push(argName + ": " + tsArg);
        return acc;
    }, {
        $args: [],
        args: [],
        variables: [],
        tsArgs: [],
    }), $args = _a.$args, args = _a.args, variables = _a.variables, tsArgs = _a.tsArgs;
    var isScalar = exports.evaluateType(data).isScalar;
    var returnedType = exports.getOneTSType({ field: data, prefix: prefix, suffix: suffix });
    var renderedArgs = '';
    if (tsArgs.length) {
        renderedArgs = "args: {" + tsArgs.join('\n') + "}";
    }
    else if (!isScalar && !tsArgs.length) {
        renderedArgs = "";
    }
    var scalarFunction = "\n    return abortable" + type.high + "<" + returnedType + ">({\n      " + type.little + ": graphQlTag`\n        " + type.little + " " + methodName + " " + (hasArgs ? "(" + $args.join(',') + ")" : '') + " {\n          " + methodName + (hasArgs ? "(" + args.join(',') + ")" : '') + "\n        }`,\n      variables: {\n        " + variables.map(function (m) { return m + ":args." + m; }).join(',') + "\n      }\n    });\n  ";
    var nonScalarFunction = "\n    return {\n      $fragment: async (fragment: string | DocumentNode) => {\n        return abortable" + type.high + "<" + returnedType + ">({\n          " + type.little + ": graphQlTag`\n            " + type.little + " " + methodName + " " + (hasArgs ? "(" + $args.join(',') + ")" : '') + " {\n              " + methodName + (hasArgs ? "(" + args.join(',') + ")" : '') + " {\n                ${fragment}\n              }\n          }`,\n          variables: {\n            " + variables.map(function (m) { return m + ":args." + m; }).join(',') + "\n          }\n        });\n      }\n    }\n  ";
    var template = "\n    " + methodName + ": " + (isScalar ? 'async' : '') + " (" + renderedArgs + "): " + (isScalar ? "Promise<AbordableRequest<" + returnedType + ">>" : "Fragmentable<" + returnedType + ">") + " => {\n        " + (isScalar ? scalarFunction : nonScalarFunction) + "\n      }\n    ,";
    return template;
};
