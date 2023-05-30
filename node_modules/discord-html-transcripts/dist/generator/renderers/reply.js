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
const discord_components_react_1 = require("@derockdev/discord-components-react");
const discord_js_1 = require("discord.js");
const react_1 = __importDefault(require("react"));
const content_1 = __importStar(require("./content"));
async function renderReply(message, context) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!message.reference)
        return null;
    if (message.reference.guildId !== ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id))
        return null;
    const referencedMessage = context.messages.find((m) => m.id === message.reference.messageId);
    if (!referencedMessage)
        return react_1.default.createElement(discord_components_react_1.DiscordReply, { slot: "reply" }, "Message could not be loaded.");
    const isCrosspost = referencedMessage.reference && referencedMessage.reference.guildId !== ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.id);
    const isCommand = referencedMessage.interaction !== null;
    return (react_1.default.createElement(discord_components_react_1.DiscordReply, { slot: "reply", edited: !isCommand && referencedMessage.editedAt !== null, attachment: referencedMessage.attachments.size > 0, author: (_d = (_c = referencedMessage.member) === null || _c === void 0 ? void 0 : _c.nickname) !== null && _d !== void 0 ? _d : referencedMessage.author.username, avatar: (_e = referencedMessage.author.avatarURL({ size: 32 })) !== null && _e !== void 0 ? _e : undefined, roleColor: (_g = (_f = referencedMessage.member) === null || _f === void 0 ? void 0 : _f.displayHexColor) !== null && _g !== void 0 ? _g : undefined, bot: !isCrosspost && referencedMessage.author.bot, verified: (_h = referencedMessage.author.flags) === null || _h === void 0 ? void 0 : _h.has(discord_js_1.UserFlags.VerifiedBot), op: message.channel.isThread() && referencedMessage.author.id === message.channel.ownerId, server: isCrosspost !== null && isCrosspost !== void 0 ? isCrosspost : undefined, command: isCommand }, referencedMessage.content ? (react_1.default.createElement("span", { "data-goto": referencedMessage.id }, await (0, content_1.default)(referencedMessage.content, Object.assign(Object.assign({}, context), { type: content_1.RenderType.REPLY })))) : isCommand ? (react_1.default.createElement("em", { "data-goto": referencedMessage.id }, "Click to see command.")) : (react_1.default.createElement("em", { "data-goto": referencedMessage.id }, "Click to see attachment."))));
}
exports.default = renderReply;
//# sourceMappingURL=reply.js.map