import { Router } from "express";
import { paymentController } from "./payment.controller";


const router = Router();


router.get("/", paymentController.createUser);




export const paymentRoutes = router;
