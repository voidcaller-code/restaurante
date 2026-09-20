import { BASE_API, PAYMENT_STATUS } from "../utils/constants";
import { apiFetch } from "./apiFetch";

export async function createPaymentApi(paymentData) {
  const url = `${BASE_API}/api/payments/`;

  return apiFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });
}

export async function getPaymentByTableApi(idTable) {
  const tableFilter = `table=${idTable}`;
  const statusFilter = `statusPayment=${PAYMENT_STATUS.PENDING}`;

  const url = `${BASE_API}/api/payments/?${tableFilter}&${statusFilter}`;

  return apiFetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function closePaymentApi(idPayment) {
  const url = `${BASE_API}/api/payments/${idPayment}/`;

  return apiFetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      statusPayment: PAYMENT_STATUS.PAID,
    }),
  });
}

export async function getPaymentsApi() {
  const paymentFilter = `statusPayment=${PAYMENT_STATUS.PAID}`;
  const orderingFilter = "ordering=created_at";

  const url = `${BASE_API}/api/payments/?${paymentFilter}&${orderingFilter}`;

  return apiFetch(url);
}
