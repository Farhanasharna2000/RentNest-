import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/create", auth("TENANT"), paymentController.createPayment);
router.post("/confirm", auth("TENANT"), paymentController.confirmPayment);
router.get("/", auth("TENANT"), paymentController.getUserPaymentHistory);
router.get("/:id", auth("TENANT"), paymentController.getPaymentDetails);

export const paymentRoutes = router;
