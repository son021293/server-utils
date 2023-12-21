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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findServer = void 0;
const findServer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const validServer = [];
    yield Promise.all(data.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield fetch(item.url, { signal: AbortSignal.timeout(5000) });
            const statusCode = res.status;
            if (statusCode && statusCode >= 200 && statusCode <= 299) {
                validServer.push(item);
            }
        }
        catch (e) {
        }
    })));
    if (validServer.length === 0)
        return Promise.reject("No available server");
    const sortedServersLowestPriority = [...validServer].sort((a, b) => a.priority - b.priority);
    return Promise.resolve(sortedServersLowestPriority[0]);
});
exports.findServer = findServer;
