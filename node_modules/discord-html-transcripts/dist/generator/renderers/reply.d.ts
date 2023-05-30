/// <reference types="react" />
import { type Message } from 'discord.js';
import type { RenderMessageContext } from '..';
export default function renderReply(message: Message, context: RenderMessageContext): Promise<JSX.Element | null>;
