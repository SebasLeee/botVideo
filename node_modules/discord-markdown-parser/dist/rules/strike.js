"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strikethrough = void 0;
const simple_markdown_1 = __importDefault(require("simple-markdown"));
const extend_1 = require("../utils/extend");
const regex_1 = require("../utils/regex");
exports.strikethrough = (0, extend_1.extend)({
    match: simple_markdown_1.default.inlineRegex(regex_1.StrikeThroughRegex),
}, simple_markdown_1.default.defaultRules.del);
