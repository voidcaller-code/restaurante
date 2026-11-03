import { BASE_API } from "../utils/constants";
import { apiFetch } from "./apiFetch";

export async function getTablesApi(token, branchId) {
  const branchFilter = branchId ? `?branch=${branchId}` : "";
  const url = `${BASE_API}/api/v1/tables/${branchFilter}`;

  return apiFetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function addTableApi(data, token) {
  const url = `${BASE_API}/api/v1/tables/`;

  return apiFetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateTableApi(id, data, token) {
  const url = `${BASE_API}/api/v1/tables/${id}/`;

  return apiFetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteTableApi(id, token) {
  const url = `${BASE_API}/api/v1/tables/${id}/`;

  return apiFetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getTableApi(idTable) {
  const url = `${BASE_API}/api/v1/tables/${idTable}/`;
  return apiFetch(url);
}

export async function getTableByIdApi(idTable) {
  const tableFilter = `id=${encodeURIComponent(idTable)}`;
  const url = `${BASE_API}/api/v1/tables/?${tableFilter}`;

  return apiFetch(url);
}
