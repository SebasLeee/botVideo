"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockQuote = void 0;
const simple_markdown_1 = __importDefault(require("simple-markdown"));
const extend_1 = require("../utils/extend");
const regex_1 = require("../utils/regex");
exports.blockQuote = (0, extend_1.extend)({
    match: function (source, state, prevSource) {
        return !/^$|\n *$/.test(prevSource) || state.inQuote ? null : regex_1.BlockQuoteRegex.exec(source);
    },
    parse: function (capture, parse, state) {
        const all = capture[0];
        const isBlock = Boolean(/^ *>>> ?/.exec(all));
        const removeSyntaxRegex = isBlock ? /^ *>>> ?/ : /^ *> ?/gm;
        const content = all.replace(removeSyntaxRegex, '');
        return {
            content: parse(content, Object.assign({}, state, { inQuote: true })),
            type: 'blockQuote',
        };
    },
}, simple_markdown_1.default.defaultRules.blockQuote);
