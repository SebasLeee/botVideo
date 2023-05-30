/// <reference types="react" />
import type { Attachment, Message } from 'discord.js';
import type { RenderMessageContext } from '..';
export default function renderAttachments(message: Message, context: RenderMessageContext): Promise<JSX.Element | null>;
export declare function renderAttachment(attachment: Attachment, context: RenderMessageContext): Promise<JSX.Element>;
