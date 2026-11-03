import { BASE_API } from "../utils/constants";
import { apiFetch } from "./apiFetch";

export async function getProductsApi(pageSize) {
  const pageSizeFilter = pageSize ? `?page_size=${pageSize}` : "";
  const url = `${BASE_API}/api/v1/products/${pageSizeFilter}`;
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

  const url = `${BASE_API}/api/v1/products/`;

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

  const url = `${BASE_API}/api/v1/products/${id}/`;

  return apiFetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function deleteProductApi(id, token) {
  const url = `${BASE_API}/api/v1/products/${id}/`;

  return apiFetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getProductByIdApi(id) {
  const url = `${BASE_API}/api/v1/products/${id}/`;
  return apiFetch(url);
}

export async function getProductsByCategoryApi(idCategory) {
  const categoryFilter = `category=${idCategory}`;
  const url = `${BASE_API}/api/v1/products/?${categoryFilter}`;

  return apiFetch(url);
}

export async function getAvailableProductsByCategoryApi(idTable, idCategory) {
  const params = new URLSearchParams({
    table: String(idTable),
    product__category: String(idCategory),
    available: 'true',
    page_size: '100',
  });
  const url = `${BASE_API}/api/v1/branch-products/?${params}`;

  return apiFetch(url, { cache: 'no-store' });
}
