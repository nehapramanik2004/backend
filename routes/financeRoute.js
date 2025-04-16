import express, { application, Router } from 'express';
import { createfinance, getAllfinances, getfinanceById, updatefinance, deleteFinance} from "../controllers/financeController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createfinance", createfinance);
router.get("/getAllfinances", getAllfinances);
router.get("/getfinanceById/:id", getfinanceById);
router.put("/updatefinance/:id",  updatefinance);
router.delete("/deleteFinance/: id",deleteFinance);

export default router;
    