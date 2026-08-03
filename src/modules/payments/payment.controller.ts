import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.user.id;
  const result = await paymentService.createPayment(tenantId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Payment intent created successfully",
    data: result,
  });
});

const confirmPayment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await paymentService.confirmPayment(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment confirmed successfully",
    data: result,
  });
});

const getUserPaymentHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.user.id;
  const result = await paymentService.getUserPaymentHistory(tenantId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment history retrieved successfully",
    data: result,
  });
});

const getPaymentDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.user.id;
  const id = req.params.id as string;
  const result = await paymentService.getPaymentDetails(id, tenantId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment details retrieved successfully",
    data: result,
  });
});

export const paymentController = {
  createPayment,
  confirmPayment,
  getUserPaymentHistory,
  getPaymentDetails
};
