import express, { application, Router } from 'express';
import { createSuppliers, getAllsuppliers, getsuppliersById, updateSuppliers, deletesuppliers } from "../controllers/suppliersController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createSuppliers", createSuppliers);
router.get("/getAllsuppliers", getAllsuppliers);
router.get("/getsuppliersById/:id", getsuppliersById);
router.put("/updateSuppliers/:id", updateSuppliers );
router.delete("/deletesuppliers/:id",deletesuppliers );

export default router;
    