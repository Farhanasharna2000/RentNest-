

const createRentalRequest = async (tenantId: string, payload: any) => {
  
};

const getTenantRentalRequests = async (tenantId: string) => {
 
};

const getRentalRequestDetails = async (id: string, userId: string, role: string) => {
 
};

const getLandlordRentalRequests = async (landlordId: string) => {
 
};

const updateRentalRequestStatus = async (id: string, landlordId: string, payload: { status: "APPROVED" | "REJECTED" }) => {
  
};

export const rentalService = {
  createRentalRequest,
  getTenantRentalRequests,
  getRentalRequestDetails,
  getLandlordRentalRequests,
  updateRentalRequestStatus
};
