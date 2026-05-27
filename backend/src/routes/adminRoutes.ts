import { Router } from 'express';
import {
  login,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/adminController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/login', login);

// Protected routes
router.get('/', authMiddleware, getAdmins);
router.post('/', authMiddleware, createAdmin);
router.put('/:id', authMiddleware, updateAdmin);
router.delete('/:id', authMiddleware, deleteAdmin);

export default router;
