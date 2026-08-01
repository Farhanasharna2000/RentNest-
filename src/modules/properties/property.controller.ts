import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { propertyService } from "./property.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
});

const updateProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
});

const deleteProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
});

const getAllProperties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getPropertyById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
 
});

export const propertyController = {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllProperties,
  getPropertyById
};
