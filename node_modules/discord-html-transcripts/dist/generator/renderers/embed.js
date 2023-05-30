"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEmbed = void 0;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const react_1 = __importDefault(require("react"));
const embeds_1 = require("../../utils/embeds");
const content_1 = __importStar(require("./content"));
async function renderEmbed(embed, context) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    return (react_1.default.createElement(discord_components_react_1.DiscordEmbed, { embedTitle: (_a = embed.title) !== null && _a !== void 0 ? _a : undefined, slot: "embeds", key: `${context.message.id}-e-${context.index}`, authorImage: (_c = (_b = embed.author) === null || _b === void 0 ? void 0 : _b.proxyIconURL) !== null && _c !== void 0 ? _c : (_d = embed.author) === null || _d === void 0 ? void 0 : _d.iconURL, authorName: (_e = embed.author) === null || _e === void 0 ? void 0 : _e.name, authorUrl: (_f = embed.author) === null || _f === void 0 ? void 0 : _f.url, color: (_g = embed.hexColor) !== null && _g !== void 0 ? _g : undefined, image: (_j = (_h = embed.image) === null || _h === void 0 ? void 0 : _h.proxyURL) !== null && _j !== void 0 ? _j : (_k = embed.image) === null || _k === void 0 ? void 0 : _k.url, thumbnail: (_m = (_l = embed.thumbnail) === null || _l === void 0 ? void 0 : _l.proxyURL) !== null && _m !== void 0 ? _m : (_o = embed.thumbnail) === null || _o === void 0 ? void 0 : _o.url, url: (_p = embed.url) !== null && _p !== void 0 ? _p : undefined },
        embed.description && (react_1.default.createElement(discord_components_react_1.DiscordEmbedDescription, { slot: "description" }, await (0, content_1.default)(embed.description, Object.assign(Object.assign({}, context), { type: content_1.RenderType.EMBED })))),
        embed.fields.length > 0 && (react_1.default.createElement(discord_components_react_1.DiscordEmbedFields, { slot: "fields" }, await Promise.all(embed.fields.map(async (field, id) => (react_1.default.createElement(discord_components_react_1.DiscordEmbedField, { key: `${context.message.id}-e-${context.index}-f-${id}`, fieldTitle: field.name, inline: field.inline, inlineIndex: (0, embeds_1.calculateInlineIndex)(embed.fields, id) }, await (0, content_1.default)(field.value, Object.assign(Object.assign({}, context), { type: content_1.RenderType.EMBED })))))))),
        embed.footer && (react_1.default.createElement(discord_components_react_1.DiscordEmbedFooter, { slot: "footer", footerImage: (_q = embed.footer.proxyIconURL) !== null && _q !== void 0 ? _q : embed.footer.iconURL, timestamp: (_r = embed.timestamp) !== null && _r !== void 0 ? _r : undefined }, embed.footer.text))));
}
exports.renderEmbed = renderEmbed;
//# sourceMappingURL=embed.js.map