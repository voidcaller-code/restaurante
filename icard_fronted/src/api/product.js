import { BASE_API } from "../utils/constants";
import { apiFetch } from "./apiFetch";

export async function getProductsApi() {
  const url = `${BASE_API}/api/products/`;
  return apiFetch(url);
}

export async function addProductApi(data, token) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("price", data.price);
  formData.append("category", data.category);
  formData.append("active", data.active);

  if (data.image) {
    formData.append("image", data.image);
  }

  const url = `${BASE_API}/api/products/`;

  return apiFetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function updateProductApi(id, data, token) {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("price", data.price);
  formData.append("category", data.category);
  formData.append("active", data.active);

  if (data.image) {
    formData.append("image", data.image);
  }

  const url = `${BASE_API}/api/products/${id}/`;

  return apiFetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function deleteProductApi(id, token) {
  const url = `${BASE_API}/api/products/${id}/`;

  return apiFetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getProductByIdApi(id) {
  const url = `${BASE_API}/api/products/${id}/`;
  return apiFetch(url);
}

export async function getProductsByCategoryApi(idCategory) {
  const categoryFilter = `category=${idCategory}`;
  const url = `${BASE_API}/api/products/?${categoryFilter}`;

  return apiFetch(url);
}
