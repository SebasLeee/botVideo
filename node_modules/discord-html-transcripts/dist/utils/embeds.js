"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateInlineIndex = exports.calculateAmountOfTrue = void 0;
const calculateAmountOfTrue = (array) => {
    // get the amount of true values before endIndex, stopping at the first false value
    for (let i = array.length - 1; i >= 0; i--) {
        if (!array[i]) {
            return array.length - i;
        }
    }
    return array.length - 1;
};
exports.calculateAmountOfTrue = calculateAmountOfTrue;
function calculateInlineIndex(fields, currentFieldIndex) {
    // get the amount of inline fields before the current field without gaps
    const inlineFieldsBefore = fields.slice(0, currentFieldIndex).map((e) => { var _a; return (_a = e.inline) !== null && _a !== void 0 ? _a : false; });
    const amount = (0, exports.calculateAmountOfTrue)(inlineFieldsBefore) + 1;
    return (amount % 3) + 1;
}
exports.calculateInlineIndex = calculateInlineIndex;
//# sourceMappingURL=embeds.js.map