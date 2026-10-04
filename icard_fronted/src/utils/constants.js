export const BASE_API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const TOKEN = "token";

export const ORDER_STATUS = {
  PENDING: "pending",
  DELIVERED: "delivered",
};

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
};
