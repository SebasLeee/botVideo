"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderComponent = void 0;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const discord_js_1 = require("discord.js");
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils/utils");
function renderComponentRow(row, id) {
    return (react_1.default.createElement(discord_components_react_1.DiscordActionRow, { key: id }, row.components.map((component, id) => renderComponent(component, id))));
}
exports.default = renderComponentRow;
const ButtonStyleMapping = {
    [discord_js_1.ButtonStyle.Primary]: 'primary',
    [discord_js_1.ButtonStyle.Secondary]: 'secondary',
    [discord_js_1.ButtonStyle.Success]: 'success',
    [discord_js_1.ButtonStyle.Danger]: 'destructive',
    [discord_js_1.ButtonStyle.Link]: 'secondary',
};
function renderComponent(component, id) {
    var _a;
    if (component.type === discord_js_1.ComponentType.Button) {
        return (react_1.default.createElement(discord_components_react_1.DiscordButton, { key: id, type: ButtonStyleMapping[component.style], url: (_a = component.url) !== null && _a !== void 0 ? _a : undefined, emoji: component.emoji ? (0, utils_1.parseDiscordEmoji)(component.emoji) : undefined }, component.label));
    }
    return undefined;
}
exports.renderComponent = renderComponent;
//# sourceMappingURL=components.js.map