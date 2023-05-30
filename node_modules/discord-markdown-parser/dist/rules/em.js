"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.em = void 0;
const extend_1 = require("../utils/extend");
const simple_markdown_1 = __importDefault(require("simple-markdown"));
exports.em = (0, extend_1.extend)({
    parse: function (capture, parse, state) {
        const parsed = simple_markdown_1.default.defaultRules.em.parse(capture, parse, Object.assign({}, state, { inEmphasis: true }));
        return state.inEmphasis ? parsed.content : parsed;
    },
}, simple_markdown_1.default.defaultRules.em);
