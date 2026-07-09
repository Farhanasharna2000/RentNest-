import { Router } from "express";
import { reviewController } from "./review.controller";


const router = Router();


router.get("/", reviewController.createUser);




export const reviewRoutes = router;
