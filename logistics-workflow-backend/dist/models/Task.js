"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    workflowId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Workflow', required: true },
    nodeId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed', 'failed'], default: 'pending' },
    assignedTo: String,
    metadata: Object,
    startedAt: Date,
    completedAt: Date
}, { timestamps: true });
// Indexes for faster queries
TaskSchema.index({ workflowId: 1 });
TaskSchema.index({ status: 1 });
exports.default = mongoose_1.default.model('Task', TaskSchema);
