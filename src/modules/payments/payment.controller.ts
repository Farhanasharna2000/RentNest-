import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";


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
