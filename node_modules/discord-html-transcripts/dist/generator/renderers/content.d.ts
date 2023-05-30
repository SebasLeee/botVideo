import { ChannelType } from 'discord.js';
import { type ReactNode } from 'react';
import type { SingleASTNode } from 'simple-markdown';
import type { RenderMessageContext } from '../';
export declare enum RenderType {
    EMBED = 0,
    REPLY = 1,
    NORMAL = 2,
    WEBHOOK = 3
}
type RenderContentContext = RenderMessageContext & {
    type: RenderType;
    _internal?: {
        largeEmojis?: boolean;
    };
};
export default function renderContent(content: string, context: RenderContentContext): Promise<JSX.Element>;
export declare function renderASTNode(node: SingleASTNode, context: RenderContentContext): Promise<ReactNode>;
export declare function getChannelType(channelType: ChannelType): 'channel' | 'voice' | 'thread' | 'forum';
export {};
