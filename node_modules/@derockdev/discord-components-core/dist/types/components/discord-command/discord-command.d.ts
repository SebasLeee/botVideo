import { ComponentInterface } from '../../stencil-public-runtime';
export declare class DiscordCommand implements ComponentInterface {
  /**
   * The DiscordCommand element.
   */
  el: HTMLElement;
  /**
   * The id of the profile data to use.
   */
  profile: string;
  /**
   * The message author's username.
   * @default 'User'
   */
  author: string;
  /**
   * The message author's avatar. Can be an avatar shortcut, relative path, or external link.
   */
  avatar: string;
  /**
   * The message author's primary role color. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
   */
  roleColor: string;
  /**
   * The name of the command invoked.
   */
  command: string;
  render(): any;
}
