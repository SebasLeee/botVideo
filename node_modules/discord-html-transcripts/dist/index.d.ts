import { Collection, type Channel, type Message, type TextBasedChannel } from 'discord.js';
import { ExportReturnType, type CreateTranscriptOptions, type GenerateFromMessagesOptions, type ObjectType } from './types';
/**
 *
 * @param messages The messages to generate a transcript from
 * @param channel  The channel the messages are from (used for header and guild name)
 * @param options  The options to use when generating the transcript
 * @returns        The generated transcript
 */
export declare function generateFromMessages<T extends ExportReturnType = ExportReturnType.Attachment>(messages: Message[] | Collection<string, Message>, channel: Channel, options?: GenerateFromMessagesOptions<T>): Promise<ObjectType<T>>;
/**
 *
 * @param channel The channel to create a transcript from
 * @param options The options to use when creating the transcript
 * @returns       The generated transcript
 */
export declare function createTranscript<T extends ExportReturnType = ExportReturnType.Attachment>(channel: TextBasedChannel, options?: CreateTranscriptOptions<T>): Promise<ObjectType<T>>;
declare const _default: {
    createTranscript: typeof createTranscript;
    generateFromMessages: typeof generateFromMessages;
};
export default _default;
export * from './types';
