"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAttachment = void 0;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils/utils");
async function renderAttachments(message, context) {
    if (message.attachments.size === 0)
        return null;
    return (react_1.default.createElement(discord_components_react_1.DiscordAttachments, { slot: "attachments" }, await Promise.all(message.attachments.map((attachment) => renderAttachment(attachment, context)))));
}
exports.default = renderAttachments;
// "audio" | "video" | "image" | "file"
function getAttachmentType(attachment) {
    var _a, _b, _c;
    const type = (_c = (_b = (_a = attachment.contentType) === null || _a === void 0 ? void 0 : _a.split('/')) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : 'unknown';
    if (['audio', 'video', 'image'].includes(type))
        return type;
    return 'file';
}
async function renderAttachment(attachment, context) {
    let url = attachment.url;
    const name = attachment.name;
    const width = attachment.width;
    const height = attachment.height;
    const type = getAttachmentType(attachment);
    // if the attachment is an image, download it to a data url
    if (context.saveImages && type === 'image') {
        const downloaded = await (0, utils_1.downloadImageToDataURL)(url);
        if (downloaded) {
            url = downloaded;
        }
    }
    return (react_1.default.createElement(discord_components_react_1.DiscordAttachment, { type: type, size: (0, utils_1.formatBytes)(attachment.size), key: attachment.id, slot: "attachment", url: url, alt: name !== null && name !== void 0 ? name : undefined, width: width !== null && width !== void 0 ? width : undefined, height: height !== null && height !== void 0 ? height : undefined }));
}
exports.renderAttachment = renderAttachment;
//# sourceMappingURL=attachment.js.map