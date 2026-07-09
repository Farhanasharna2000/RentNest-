import { Router } from "express";
import { propertyController } from "./property.controller";


const router = Router();


router.get("/", propertyController.createUser);




export const propertyRoutes = router;
