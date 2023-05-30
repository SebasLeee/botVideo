"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twemoji = void 0;
const simple_markdown_1 = __importDefault(require("simple-markdown"));
const twemojiRegex_1 = require("../../utils/twemojiRegex");
exports.twemoji = {
    order: simple_markdown_1.default.defaultRules.strong.order,
    match: (source) => twemojiRegex_1.TwemojiRegex.exec(source),
    parse: function (capture) {
        return {
            name: capture[0],
        };
    },
};
