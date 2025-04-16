import express, { application, Router } from 'express';
import { createStockManagement, getAllStockManagements, getStockManagementById, updateStockManagement, deleteStockManagement } from "../controllers/stockmanagementController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createStockManagement", createStockManagement);
router.get("/getAllStockManagements", getAllStockManagements);
router.get("/getStockManagementById/:id", getStockManagementById);
router.put("/updateStockManagement/:id",  updateStockManagement);
router.delete("/deleteStockManagement/:id", deleteStockManagement);

export default router;
    