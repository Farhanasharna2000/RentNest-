import { Router } from "express";
import { adminController } from "./admin.controller";


const router = Router();


router.get("/", adminController.createUser);




export const adminRoutes = router;
