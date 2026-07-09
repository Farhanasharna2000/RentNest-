import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { userRoutes } from "./modules/users/users.route";
import { categoryRoutes } from "./modules/categories/category.route";
import { propertyRoutes } from "./modules/properties/property.route";
import { rentalRoutes } from "./modules/rentals/rental.route";
import { paymentRoutes } from "./modules/payments/payment.route";
import { reviewRoutes } from "./modules/reviews/review.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { authRoutes } from "./modules/auth/auth.route";



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
app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/categories", categoryRoutes);

app.use("/properties", propertyRoutes);

app.use("/rentals", rentalRoutes);

app.use("/payments", paymentRoutes);

app.use("/reviews", reviewRoutes);

app.use("/admin", adminRoutes);



export default app;
