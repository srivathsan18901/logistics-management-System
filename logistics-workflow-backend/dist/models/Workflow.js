"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WorkflowSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    nodes: [
        {
            id: String,
            type: String,
            data: Object,
            position: Object
        }
    ],
    transitions: [
        {
            id: String,
            source: String,
            target: String,
            condition: String
        }
    ],
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Workflow', WorkflowSchema);
