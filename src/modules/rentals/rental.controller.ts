import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";


const createRentalRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
});

const getTenantRentalRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
});

const getRentalRequestDetails = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
});

const getLandlordRentalRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
});

const updateRentalRequestStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
});

export const rentalController = {
  createRentalRequest,
  getTenantRentalRequests,
  getRentalRequestDetails,
  getLandlordRentalRequests,
  updateRentalRequestStatus
};
