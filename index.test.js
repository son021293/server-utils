"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const globals_1 = require("@jest/globals");
const jest_fetch_mock_1 = __importDefault(require("jest-fetch-mock"));
(0, globals_1.describe)("Find lowest priority server", () => {
    beforeEach(() => {
        jest_fetch_mock_1.default.resetMocks();
    });
    (0, globals_1.it)("Lowest priority server found", () => __awaiter(void 0, void 0, void 0, function* () {
        jest_fetch_mock_1.default.mockResponse(req => {
            const urls = ["https://gitlab.com", "http://app.scnt.me/"];
            return urls.includes(req.url) ? Promise.resolve({ status: 200 }) : Promise.reject();
        });
        const data = [
            {
                "url": "https://does-not-work.perfume.new",
                "priority": 1
            },
            {
                "url": "https://gitlab.com",
                "priority": 4
            },
            {
                "url": "http://app.scnt.me",
                "priority": 3
            },
            {
                "url": "https://offline.scentronix.com",
                "priority": 2
            }
        ];
        const resp = yield (0, index_1.findServer)(data);
        (0, globals_1.expect)(resp).toStrictEqual({ url: "http://app.scnt.me", priority: 3 });
    }));
    (0, globals_1.it)("No server found", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = [
            {
                "url": "htt://about.gitlab.com",
                "priority": 3
            },
            {
                "url": "https://gitlab.com",
                "priority": 4
            },
        ];
        jest_fetch_mock_1.default.mockResponse(() => Promise.reject());
        yield (0, index_1.findServer)(data).catch((e) => (0, globals_1.expect)(e).toEqual("No available server"));
    }));
});
