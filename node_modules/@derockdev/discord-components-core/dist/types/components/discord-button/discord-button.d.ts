import { ComponentInterface } from '../../stencil-public-runtime';
export declare class DiscordButton implements ComponentInterface {
  /**
   * The DiscordButton element.
   */
  el: HTMLElement;
  /**
   * The emoji URL to use in the button.
   */
  emoji: string;
  /**
   * The name of the emoji used in the button.
   */
  emojiName: string;
  /**
   * The URL for the button. Setting this will force the button type to be `secondary`.
   */
  url: string;
  /**
   * Whether to show the button as disabled.
   */
  disabled: boolean;
  /**
   * The type of button this is, this will change the color of the button.
   * Valid values: `primary`, `secondary`, `success`, `destructive`.
   */
  type: 'primary' | 'secondary' | 'success' | 'destructive';
  handleType(value: string): void;
  render(): any;
}
