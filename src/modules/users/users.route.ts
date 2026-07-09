import { Router } from "express";
import { userController } from "./users.controller";


const router = Router();


router.get("/", userController.createUser);




export const userRoutes = router;
