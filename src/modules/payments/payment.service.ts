
const createPayment = async (tenantId: string, payload: { rentalRequestId: string }) => {
  
};

const confirmPayment = async (payload: { transactionId: string }) => {
 
};

const getUserPaymentHistory = async (tenantId: string) => {
  
};

const getPaymentDetails = async (id: string, tenantId: string) => {
  
};

export const paymentService = {
  createPayment,
  confirmPayment,
  getUserPaymentHistory,
  getPaymentDetails
};
