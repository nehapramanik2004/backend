import express, { application, Router } from 'express';
import { createbanner, getAllbanners, getbannerById, updatebanner, deleteBanner} from "../controllers/bannerController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createbanner", createbanner);
router.get("/getAllbanners", getAllbanners);
router.get("/getbannerById/:id", getbannerById);
router.put("/updatebanner/:id",  updatebanner);
router.delete("/deleteBanner/: id", deleteBanner);

export default router;
    