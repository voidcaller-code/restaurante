import { BASE_API } from "../utils/constants";
import { apiFetch } from "./apiFetch";

export async function loginApi(formValue) {
  const url = `${BASE_API}/api/auth/login/`;

  return apiFetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValue),
  });
}

export async function getMeApi(token) {
  const url = `${BASE_API}/api/auth/me/`;

  return apiFetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getUsersApi(token) {
  const url = `${BASE_API}/api/users/`;

  return apiFetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function addUserApi(data, token) {
  const url = `${BASE_API}/api/users/`;

  return apiFetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function updateUserApi(id, data, token) {
  const url = `${BASE_API}/api/users/${id}/`;

  return apiFetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function deleteUserApi(id, token) {
  const url = `${BASE_API}/api/users/${id}/`;

  return apiFetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
