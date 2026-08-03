import { PaymentStatus, RentalStatus } from "../../../prisma/generated/prisma/client";
import config from "../../config";
import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

const stripe = new Stripe(config.stripe_secret_key || "", {
  apiVersion: "2026-07-29.dahlia" as any,
});

const createPayment = async (tenantId: string, payload: { rentalRequestId: string }) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: { id: payload.rentalRequestId, tenantId: tenantId },
    include: { property: true }
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found or not authorized");
  }

  const amount = Number(rentalRequest.property.rent);

const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(amount * 100),
  currency: "usd",
  metadata: {
    rentalRequestId: rentalRequest.id,
    tenantId,
  },
});

const payment = await prisma.payment.create({
  data: {
    rentalRequestId: rentalRequest.id,
    amount,
    provider: "STRIPE",
    transactionId: paymentIntent.id,
    status: PaymentStatus.PENDING,
  },
});

return {
  payment,
  clientSecret: paymentIntent.client_secret,
};
};

const confirmPayment = async (payload: { transactionId: string }) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionId: payload.transactionId }
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.provider === "STRIPE") {
    const paymentIntent = await stripe.paymentIntents.retrieve(payload.transactionId);

    if (paymentIntent.status === "succeeded") {
      const updatedPayment = await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.COMPLETED,
          paidAt: new Date()
        }
      });

      await prisma.rentalRequest.update({
        where: { id: payment.rentalRequestId },
        data: { status: RentalStatus.APPROVED }
      });

      return updatedPayment;
    }
  }

  return payment;
};

const getUserPaymentHistory = async (tenantId: string) => {
  return await prisma.payment.findMany({
    where: {
      rentalRequest: {
        tenantId: tenantId
      }
    },
    include: {
      rentalRequest: {
        include: { property: true }
      }
    },
    orderBy: { updatedAt: 'desc' }
  });
};

const getPaymentDetails = async (id: string, tenantId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: id },
    include: {
      rentalRequest: {
        include: { property: true }
      }
    }
  });

  if (!payment || payment.rentalRequest.tenantId !== tenantId) {
    throw new Error("Payment not found or not authorized");
  }

  return payment;
};

export const paymentService = {
  createPayment,
  confirmPayment,
  getUserPaymentHistory,
  getPaymentDetails
};
