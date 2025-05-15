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
exports.getTasksByWorkflow = exports.updateTaskStatus = exports.executeWorkflow = exports.getWorkflowById = exports.createWorkflow = void 0;
const Workflow_1 = __importDefault(require("../models/Workflow"));
const Task_1 = __importDefault(require("../models/Task"));
const createWorkflow = (workflowData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const workflow = yield Workflow_1.default.create(Object.assign(Object.assign({}, workflowData), { createdBy: userId }));
    return workflow;
});
exports.createWorkflow = createWorkflow;
const getWorkflowById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Workflow_1.default.findById(id).populate('createdBy', 'username');
});
exports.getWorkflowById = getWorkflowById;
const executeWorkflow = (workflowId) => __awaiter(void 0, void 0, void 0, function* () {
    const workflow = yield Workflow_1.default.findById(workflowId);
    if (!workflow)
        throw new Error('Workflow not found');
    // Find the start node
    const startNode = workflow.nodes.find(node => node.type === 'start');
    if (!startNode)
        throw new Error('No start node found');
    // Create initial task
    const task = yield Task_1.default.create({
        workflowId,
        nodeId: startNode.id,
        status: 'pending'
    });
    return task;
});
exports.executeWorkflow = executeWorkflow;
const updateTaskStatus = (taskId, status, metadata) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = { status };
    if (status === 'in-progress') {
        updateData.startedAt = new Date();
    }
    else if (status === 'completed' || status === 'failed') {
        updateData.completedAt = new Date();
    }
    if (metadata) {
        updateData.metadata = metadata;
    }
    const task = yield Task_1.default.findByIdAndUpdate(taskId, updateData, { new: true });
    return task;
});
exports.updateTaskStatus = updateTaskStatus;
const getTasksByWorkflow = (workflowId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Task_1.default.find({ workflowId }).sort({ createdAt: -1 });
});
exports.getTasksByWorkflow = getTasksByWorkflow;
