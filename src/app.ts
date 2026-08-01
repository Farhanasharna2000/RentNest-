import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { categoryRoutes } from "./modules/categories/category.route";
import { propertyRoutes } from "./modules/properties/property.route";
import { rentalRoutes } from "./modules/rentals/rental.route";
import { paymentRoutes } from "./modules/payments/payment.route";
import { reviewRoutes } from "./modules/reviews/review.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { authRoutes } from "./modules/auth/auth.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { landlordPropertyRoutes } from "./modules/properties/landlordProperty.route";
import { landlordRoutes } from "./modules/rentals/landlord.route";



const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.get("/", async (req: Request, res: Response) => {
//   const user = await prisma.user.findMany();
//   console.log(user, "user");
  res.send("Hello Farhana Sharna!");
//   console.log("Hello Farhana Sharna!");

});
app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/properties", propertyRoutes);

app.use("/api/rentals", rentalRoutes);

app.use("/api/landlord/properties", landlordPropertyRoutes);
app.use("/api/landlord", landlordRoutes);


app.use("/api/payments", paymentRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/admin", adminRoutes);

app.use(globalErrorHandler);

export default app;
