import { Router } from 'express';
import express  from 'express';
import * as workflowController from '../controllers/workflowController';
import { protect, authorize } from '../middlewares/auth';

const router = Router();

router.use(protect as express.RequestHandler);

router.post('/', authorize('admin')as express.RequestHandler, workflowController.createWorkflow);
router.get('/:id', workflowController.getWorkflow as express.RequestHandler);
router.post('/:id/execute', workflowController.executeWorkflow);
router.get('/:id/tasks', workflowController.getWorkflowTasks);
router.put('/tasks/:id', workflowController.updateTaskStatus);

export default router;