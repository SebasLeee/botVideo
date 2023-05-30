import type { APIMessageComponentEmoji, Emoji } from 'discord.js';
export declare function formatBytes(bytes: number, decimals?: number): string;
export declare function parseDiscordEmoji(emoji: Emoji | APIMessageComponentEmoji): string;
export declare function downloadImageToDataURL(url: string): Promise<string | null>;
