import { BASE_API } from "../utils/constants";
import { apiFetch } from "./apiFetch";

export async function getCategoriesApi() {
  const url = `${BASE_API}/api/categories/`;
  return apiFetch(url);
}

export async function addCategoryApi(data, token) {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("title", data.title);

  const url = `${BASE_API}/api/categories/`;

  return apiFetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function updateCategoryApi(id, data, token) {
  const formData = new FormData();
  formData.append("title", data.title);

  if (data.image) {
    formData.append("image", data.image);
  }

  const url = `${BASE_API}/api/categories/${id}/`;

  return apiFetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function deleteCategoryApi(id, token) {
  const url = `${BASE_API}/api/categories/${id}/`;

  return apiFetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
