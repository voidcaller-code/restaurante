import { BASE_API, ORDER_STATUS } from "../utils/constants";
import { apiFetch } from "./apiFetch";

export async function getOrdersByTableApi(idTable, status = "", ordering = "") {
  const params = new URLSearchParams({
    table: String(idTable),
    close: "False",
    page_size: "100",
    _: String(Date.now()),
  });

  if (status) params.set("status", status);
  if (ordering) {
    params.set("ordering", ordering.replace(/^ordering=/, ""));
  }

  const url = `${BASE_API}/api/v1/orders/?${params}`;

  return apiFetch(url, { cache: "no-store" });
}

export async function checkDeliveredOrderApi(id) {
  const url = `${BASE_API}/api/v1/orders/${id}/`;

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
  const url = `${BASE_API}/api/v1/orders/`;

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
  const url = `${BASE_API}/api/v1/orders/${idOrder}/`;

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
  const url = `${BASE_API}/api/v1/orders/${idOrder}/`;

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
  const params = new URLSearchParams({
    payment: String(idPayment),
    page_size: "100",
  });
  const url = `${BASE_API}/api/v1/orders/?${params}`;

  return apiFetch(url, { cache: "no-store" });
}
