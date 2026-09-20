import { BASE_API } from "../utils/constants";
import { apiFetch } from "./apiFetch";

export async function getTablesApi(token) {
  const url = `${BASE_API}/api/tables/`;

  return apiFetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function addTableApi(data, token) {
  const url = `${BASE_API}/api/tables/`;

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
  const url = `${BASE_API}/api/tables/${id}/`;

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
  const url = `${BASE_API}/api/tables/${id}/`;

  return apiFetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getTableApi(idTable) {
  const url = `${BASE_API}/api/tables/${idTable}/`;
  return apiFetch(url);
}

export async function getTableByNumberApi(numberTable) {
  const tableFilter = `number=${numberTable}`;
  const url = `${BASE_API}/api/tables/?${tableFilter}`;

  return apiFetch(url);
}
