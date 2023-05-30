"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
const simple_markdown_1 = __importDefault(require("simple-markdown"));
const extend_1 = require("../utils/extend");
exports.url = (0, extend_1.extend)({
    parse: (capture) => {
        return {
            content: [
                {
                    type: 'text',
                    content: capture[1],
                },
            ],
            target: capture[1],
        };
    },
}, simple_markdown_1.default.defaultRules.url);
