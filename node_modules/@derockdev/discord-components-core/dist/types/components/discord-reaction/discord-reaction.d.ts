import { ComponentInterface } from '../../stencil-public-runtime';
export declare class DiscordReaction implements ComponentInterface {
  /**
   * The DiscordReaction element.
   */
  el: HTMLElement;
  /**
   * The reaction emoji image URL.
   */
  emoji: string;
  /**
   * The name of the emoji to use as alternative image text.
   * @default ':emoji'
   */
  name: string;
  /**
   * The number of people who reacted.
   * @default 1
   */
  count: number;
  /**
   * Whether the reaction should show as reacted by the user.
   * @default false
   */
  reacted: boolean;
  /**
   * Whether the reaction should be reactive.
   * @remark When the reaction is interactive left clicking it will add 1 to the counter.
   * Whereas when holding the Shift key and left clicking it will decrease the counter.
   * The counter cannot go below 1.
   * @default false
   */
  interactive: boolean;
  render(): any;
  private handleReactionClick;
}
