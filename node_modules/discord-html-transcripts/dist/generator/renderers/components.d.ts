/// <reference types="react" />
import { type MessageActionRowComponent, type ActionRow } from 'discord.js';
export default function renderComponentRow(row: ActionRow<MessageActionRowComponent>, id: number): JSX.Element;
export declare function renderComponent(component: MessageActionRowComponent, id: number): JSX.Element | undefined;
