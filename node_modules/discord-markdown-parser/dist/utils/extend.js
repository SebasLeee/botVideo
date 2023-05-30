"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extend = void 0;
const extend = (additionalRules, defaultRule) => {
    return Object.assign({}, defaultRule, additionalRules);
};
exports.extend = extend;
