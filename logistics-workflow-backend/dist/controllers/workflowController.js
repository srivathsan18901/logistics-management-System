"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getWorkflowTasks = exports.updateTaskStatus = exports.executeWorkflow = exports.getWorkflow = exports.createWorkflow = void 0;
const workflowService = __importStar(require("../services/workflowService"));
const createWorkflow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const workflow = yield workflowService.createWorkflow(req.body, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        res.status(201).json(workflow);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createWorkflow = createWorkflow;
const getWorkflow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workflow = yield workflowService.getWorkflowById(req.params.id);
        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }
        res.status(200).json(workflow);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getWorkflow = getWorkflow;
const executeWorkflow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield workflowService.executeWorkflow(req.params.id);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.executeWorkflow = executeWorkflow;
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, metadata } = req.body;
        const task = yield workflowService.updateTaskStatus(req.params.id, status, metadata);
        res.status(200).json(task);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateTaskStatus = updateTaskStatus;
const getWorkflowTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield workflowService.getTasksByWorkflow(req.params.id);
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getWorkflowTasks = getWorkflowTasks;
