"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToDashCase = exports.dashToPascalCase = void 0;
const dashToPascalCase = (str) => str
    .toLowerCase()
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
exports.dashToPascalCase = dashToPascalCase;
const camelToDashCase = (str) => str.replace(/([A-Z])/g, (m) => `-${m[0].toLowerCase()}`);
exports.camelToDashCase = camelToDashCase;
//# sourceMappingURL=case.js.map