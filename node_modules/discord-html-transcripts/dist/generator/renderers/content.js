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
exports.getChannelType = exports.renderASTNode = exports.RenderType = void 0;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const discord_markdown_parser_1 = __importDefault(require("discord-markdown-parser"));
const discord_js_1 = require("discord.js");
const react_1 = __importStar(require("react"));
const utils_1 = require("../../utils/utils");
var RenderType;
(function (RenderType) {
    RenderType[RenderType["EMBED"] = 0] = "EMBED";
    RenderType[RenderType["REPLY"] = 1] = "REPLY";
    RenderType[RenderType["NORMAL"] = 2] = "NORMAL";
    RenderType[RenderType["WEBHOOK"] = 3] = "WEBHOOK";
})(RenderType = exports.RenderType || (exports.RenderType = {}));
async function renderContent(content, context) {
    if (context.type === RenderType.REPLY && content.length > 180)
        content = content.slice(0, 180) + '...';
    // parse the markdown
    const parsed = (0, discord_markdown_parser_1.default)(content, context.type === RenderType.EMBED || context.type === RenderType.WEBHOOK ? 'extended' : 'normal');
    // check if the parsed content is only emojis
    const isOnlyEmojis = parsed.every((node) => ['emoji', 'twemoji'].includes(node.type) || (node.type === 'text' && node.content.trim().length === 0));
    if (isOnlyEmojis) {
        // now check if there are less than or equal to 25 emojis
        const emojis = parsed.filter((node) => ['emoji', 'twemoji'].includes(node.type));
        if (emojis.length <= 25) {
            context._internal = {
                largeEmojis: true,
            };
        }
    }
    return react_1.default.createElement(react_1.default.Fragment, null, await renderNodes(parsed, context));
}
exports.default = renderContent;
const renderNodes = async (nodes, context) => Array.isArray(nodes)
    ? (await Promise.all(nodes.map((node) => renderASTNode(node, context)))).map((each, i) => (react_1.default.createElement(react_1.Fragment, { key: i }, each)))
    : [await renderASTNode(nodes, context)];
async function renderASTNode(node, context) {
    var _a;
    if (!node)
        return null;
    const type = node.type;
    switch (type) {
        case 'text':
            return node.content;
        case 'link':
            return react_1.default.createElement("a", { href: node.target }, await renderNodes(node.content, context));
        case 'url':
        case 'autolink':
            return (react_1.default.createElement("a", { href: node.target, target: "_blank", rel: "noreferrer" }, ...await renderNodes(node.content, context)));
        case 'blockQuote':
            if (context.type === RenderType.REPLY) {
                return await renderNodes(node.content, context);
            }
            return react_1.default.createElement(discord_components_react_1.DiscordQuote, null, ...await renderNodes(node.content, context));
        case 'br':
        case 'newline':
            if (context.type === RenderType.REPLY)
                return ' ';
            return react_1.default.createElement("br", null);
        case 'channel': {
            const id = node.id;
            const channel = await context.callbacks.resolveChannel(id);
            return (react_1.default.createElement(discord_components_react_1.DiscordMention, { type: channel ? (channel.isDMBased() ? 'channel' : getChannelType(channel.type)) : 'channel' }, channel ? (channel.isDMBased() ? 'DM Channel' : channel.name) : `<#${id}>`));
        }
        case 'role': {
            const id = node.id;
            const role = await context.callbacks.resolveRole(id);
            return (react_1.default.createElement(discord_components_react_1.DiscordMention, { type: "role", color: context.type === RenderType.REPLY ? undefined : role === null || role === void 0 ? void 0 : role.hexColor }, role ? role.name : `<@&${id}>`));
        }
        case 'user': {
            const id = node.id;
            const user = await context.callbacks.resolveUser(id);
            return react_1.default.createElement(discord_components_react_1.DiscordMention, { type: "user" }, user ? user.username : `<@${id}>`);
        }
        case 'here':
        case 'everyone':
            return (react_1.default.createElement(discord_components_react_1.DiscordMention, { type: 'role', highlight: true }, `@${type}`));
        case 'codeBlock':
            if (context.type !== RenderType.REPLY) {
                return react_1.default.createElement(discord_components_react_1.DiscordCodeBlock, { language: node.lang, code: node.content });
            }
            return react_1.default.createElement(discord_components_react_1.DiscordInlineCode, null, node.content);
        case 'inlineCode':
            return react_1.default.createElement(discord_components_react_1.DiscordInlineCode, null, node.content);
        case 'em':
            return react_1.default.createElement(discord_components_react_1.DiscordItalic, null, await renderNodes(node.content, context));
        case 'strong':
            return react_1.default.createElement(discord_components_react_1.DiscordBold, null, await renderNodes(node.content, context));
        case 'underline':
            return react_1.default.createElement(discord_components_react_1.DiscordUnderlined, null, await renderNodes(node.content, context));
        case 'strikethrough':
            return react_1.default.createElement("s", null, await renderNodes(node.content, context));
        case 'emoticon':
            return typeof node.content === 'string' ? node.content : await renderNodes(node.content, context);
        case 'spoiler':
            return react_1.default.createElement(discord_components_react_1.DiscordSpoiler, null, await renderNodes(node.content, context));
        case 'emoji':
        case 'twemoji':
            return (react_1.default.createElement(discord_components_react_1.DiscordCustomEmoji, { name: node.name, url: (0, utils_1.parseDiscordEmoji)(node), embedEmoji: context.type === RenderType.EMBED, largeEmoji: (_a = context._internal) === null || _a === void 0 ? void 0 : _a.largeEmojis }));
        case 'timestamp':
            return react_1.default.createElement(discord_components_react_1.DiscordTime, { timestamp: parseInt(node.timestamp) * 1000, format: node.format });
        default: {
            console.log(`Unknown node type: ${type}`, node);
            return typeof node.content === 'string' ? node.content : await renderNodes(node.content, context);
        }
    }
}
exports.renderASTNode = renderASTNode;
function getChannelType(channelType) {
    switch (channelType) {
        case discord_js_1.ChannelType.GuildCategory:
        case discord_js_1.ChannelType.GuildAnnouncement:
        case discord_js_1.ChannelType.GuildText:
            return 'channel';
        case discord_js_1.ChannelType.GuildVoice:
        case discord_js_1.ChannelType.GuildStageVoice:
            return 'voice';
        case discord_js_1.ChannelType.PublicThread:
        case discord_js_1.ChannelType.PrivateThread:
        case discord_js_1.ChannelType.AnnouncementThread:
            return 'thread';
        case discord_js_1.ChannelType.GuildForum:
            return 'forum';
        default:
            return 'channel';
    }
}
exports.getChannelType = getChannelType;
//# sourceMappingURL=content.js.map