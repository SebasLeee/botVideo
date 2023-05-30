import { ComponentInterface } from '../../stencil-public-runtime';
export declare class DiscordMessages implements ComponentInterface {
  /**
   * Whether to use light theme or not.
   */
  lightTheme: boolean;
  /**
   * Whether to exclude the background or not.
   */
  noBackground: boolean;
  /**
   * Whether to use compact mode or not.
   */
  compactMode: boolean;
  componentWillRender(): void;
  render(): any;
}
