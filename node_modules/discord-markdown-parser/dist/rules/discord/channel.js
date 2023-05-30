"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.channel = void 0;
const simple_markdown_1 = __importDefault(require("simple-markdown"));
const regex_1 = require("../../utils/regex");
exports.channel = {
    order: simple_markdown_1.default.defaultRules.strong.order,
    match: (source) => regex_1.ChannelMentionRegex.exec(source),
    parse: function (capture) {
        return {
            id: capture[1],
        };
    },
};
