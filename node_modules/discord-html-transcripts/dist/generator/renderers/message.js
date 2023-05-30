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
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils/utils");
const attachment_1 = __importDefault(require("./attachment"));
const components_1 = __importDefault(require("./components"));
const content_1 = __importStar(require("./content"));
const embed_1 = require("./embed");
const reply_1 = __importDefault(require("./reply"));
const systemMessage_1 = __importDefault(require("./systemMessage"));
async function renderMessage(message, context) {
    var _a;
    if (message.system)
        return (0, systemMessage_1.default)(message);
    const isCrosspost = message.reference && message.reference.guildId !== ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id);
    return (react_1.default.createElement(discord_components_react_1.DiscordMessage, { id: `m-${message.id}`, timestamp: message.createdAt.toISOString(), key: message.id, edited: message.editedAt !== null, server: isCrosspost !== null && isCrosspost !== void 0 ? isCrosspost : undefined, highlight: message.mentions.everyone, profile: message.author.id },
        await (0, reply_1.default)(message, context),
        message.interaction && (react_1.default.createElement(discord_components_react_1.DiscordCommand, { slot: "reply", profile: message.interaction.user.id, command: '/' + message.interaction.commandName })),
        message.content &&
            (await (0, content_1.default)(message.content, Object.assign(Object.assign({}, context), { type: message.webhookId ? content_1.RenderType.WEBHOOK : content_1.RenderType.NORMAL }))),
        await (0, attachment_1.default)(message, context),
        message.embeds.length > 0 &&
            (await Promise.all(message.embeds.map(async (embed, id) => await (0, embed_1.renderEmbed)(embed, Object.assign(Object.assign({}, context), { index: id, message }))))),
        message.components.length > 0 && (react_1.default.createElement(discord_components_react_1.DiscordAttachments, { slot: "components" }, message.components.map((component, id) => (0, components_1.default)(component, id)))),
        message.reactions.cache.size > 0 && (react_1.default.createElement(discord_components_react_1.DiscordReactions, { slot: "reactions" }, message.reactions.cache.map((reaction, id) => (react_1.default.createElement(discord_components_react_1.DiscordReaction, { key: `${message.id}r${id}`, name: reaction.emoji.name, emoji: (0, utils_1.parseDiscordEmoji)(reaction.emoji), count: reaction.count }))))),
        message.hasThread && message.thread && (react_1.default.createElement(discord_components_react_1.DiscordThread, { slot: "thread", name: message.thread.name, cta: message.thread.messageCount
                ? `${message.thread.messageCount} Message${message.thread.messageCount > 1 ? 's' : ''}`
                : 'View Thread' }, message.thread.lastMessage ? (react_1.default.createElement(discord_components_react_1.DiscordThreadMessage, { profile: message.thread.lastMessage.author.id }, await (0, content_1.default)(message.thread.lastMessage.content.length > 128
            ? message.thread.lastMessage.content.substring(0, 125) + '...'
            : message.thread.lastMessage.content, Object.assign(Object.assign({}, context), { type: content_1.RenderType.REPLY })))) : (`Thread messages not saved.`)))));
}
exports.default = renderMessage;
//# sourceMappingURL=message.js.map