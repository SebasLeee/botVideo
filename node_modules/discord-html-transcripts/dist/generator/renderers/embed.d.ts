/// <reference types="react" />
import type { Embed, Message } from 'discord.js';
import type { RenderMessageContext } from '..';
type RenderEmbedContext = RenderMessageContext & {
    index: number;
    message: Message;
};
export declare function renderEmbed(embed: Embed, context: RenderEmbedContext): Promise<JSX.Element>;
export {};
