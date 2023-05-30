import type { ReactNode } from 'react';
import type { ASTNode, ParserRule } from 'simple-markdown';
import type { State } from './types';
type AdditionalRule = Partial<ParserRule> & {
    react: (node: ASTNode, output: (node: ASTNode, state?: unknown) => string, state: State) => ReactNode;
};
export declare const extend: (additionalRules: AdditionalRule, defaultRule: ParserRule) => AdditionalRule;
export {};
