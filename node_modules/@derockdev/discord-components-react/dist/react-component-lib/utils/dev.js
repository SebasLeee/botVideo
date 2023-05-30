"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deprecationWarning = exports.isDevMode = void 0;
const isDevMode = () => {
    return process && process.env && process.env.NODE_ENV === 'development';
};
exports.isDevMode = isDevMode;
const warnings = {};
const deprecationWarning = (key, message) => {
    if (exports.isDevMode()) {
        if (!warnings[key]) {
            console.warn(message);
            warnings[key] = true;
        }
    }
};
exports.deprecationWarning = deprecationWarning;
//# sourceMappingURL=dev.js.map