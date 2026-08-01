import { Router } from "express";
import { propertyController } from "./property.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/", auth("LANDLORD"), propertyController.createProperty);
router.put("/:id", auth("LANDLORD"), propertyController.updateProperty);
router.delete("/:id", auth("LANDLORD"), propertyController.deleteProperty);

router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);

export const propertyRoutes = router;
