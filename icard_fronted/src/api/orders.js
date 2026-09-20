import { BASE_API, ORDER_STATUS } from "../utils/constants";
import { apiFetch } from "./apiFetch";

export async function getOrdersByTableApi(idTable, status = "", ordering = "") {
  const tableFilter = `table=${idTable}`;
  const statusFilter = `status=${status}`;
  const closeFilter = "close=False";

  const url = `${BASE_API}/api/orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`;

  return apiFetch(url);
}

export async function checkDeliveredOrderApi(id) {
  const url = `${BASE_API}/api/orders/${id}/`;

  return apiFetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: ORDER_STATUS.DELIVERED,
    }),
  });
}

export async function addOrderToTableApi(idTable, idProduct) {
  const url = `${BASE_API}/api/orders/`;

  return apiFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: ORDER_STATUS.PENDING,
      table: idTable,
      product: idProduct,
    }),
  });
}

export async function addPaymentToOrderApi(idOrder, idPayment) {
  const url = `${BASE_API}/api/orders/${idOrder}/`;

  return apiFetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payment: idPayment,
    }),
  });
}

export async function closeOrderApi(idOrder) {
  const url = `${BASE_API}/api/orders/${idOrder}/`;

  return apiFetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      close: true,
    }),
  });
}

export async function getOrdersByPaymentApi(idPayment) {
  const paymentFilter = `payment=${idPayment}`;
  const url = `${BASE_API}/api/orders/?${paymentFilter}`;

  return apiFetch(url);
}
