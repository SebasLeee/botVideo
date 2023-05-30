"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.br = void 0;
const simple_markdown_1 = __importDefault(require("simple-markdown"));
const extend_1 = require("../utils/extend");
exports.br = (0, extend_1.extend)({
    match: simple_markdown_1.default.anyScopeRegex(/^\n/),
}, simple_markdown_1.default.defaultRules.br);
