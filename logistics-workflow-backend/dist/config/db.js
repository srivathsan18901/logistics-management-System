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
exports.getDBConnection = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined in your .env file');
}
let dbConnection;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        dbConnection = yield mongoose_1.default.createConnection("mongodb://localhost:27017/logistics-workflow");
        console.log(`MongoDB Connected: ${dbConnection}`);
        return dbConnection;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
// Optional: Getter for the connection if you need to access it elsewhere
const getDBConnection = () => {
    if (!dbConnection) {
        throw new Error('Database not initialized');
    }
    return dbConnection;
};
exports.getDBConnection = getDBConnection;
