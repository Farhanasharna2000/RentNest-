import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
});

const confirmPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
});

const getUserPaymentHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
});

const getPaymentDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
});

export const paymentController = {
  createPayment,
  confirmPayment,
  getUserPaymentHistory,
  getPaymentDetails
};
