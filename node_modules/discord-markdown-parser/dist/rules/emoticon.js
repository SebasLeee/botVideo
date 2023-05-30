"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emoticon = void 0;
const simple_markdown_1 = __importDefault(require("simple-markdown"));
const regex_1 = require("../utils/regex");
exports.emoticon = {
    order: simple_markdown_1.default.defaultRules.text.order,
    match: (source) => regex_1.EmoticonRegex.exec(source),
    parse: function (capture) {
        return {
            type: 'text',
            content: capture[1],
        };
    },
};
