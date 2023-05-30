import { type GuildMember, type Message, type User } from 'discord.js';
import React from 'react';
export default function renderSystemMessage(message: Message): Promise<JSX.Element | undefined>;
export declare function Highlight({ children, color }: {
    children: React.ReactNode;
    color?: string;
}): JSX.Element;
export declare function JoinMessage(member: GuildMember | null, fallbackUser: User): (string | JSX.Element)[];
