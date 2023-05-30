"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.text = void 0;
const simple_markdown_1 = __importDefault(require("simple-markdown"));
const extend_1 = require("../utils/extend");
const regex_1 = require("../utils/regex");
exports.text = (0, extend_1.extend)({
    match: (source) => regex_1.TextRegex.exec(source),
}, simple_markdown_1.default.defaultRules.text);
