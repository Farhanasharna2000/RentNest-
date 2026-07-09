import { Router } from "express";
import { rentalController } from "./rental.controller";


const router = Router();


router.get("/", rentalController.createUser);




export const rentalRoutes = router;
