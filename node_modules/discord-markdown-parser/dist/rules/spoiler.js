"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spoiler = void 0;
const regex_1 = require("../utils/regex");
exports.spoiler = {
    order: 0,
    match: (source) => regex_1.SpoilerRegex.exec(source),
    parse: function (capture, parse, state) {
        return {
            content: parse(capture[1], state),
        };
    },
};
