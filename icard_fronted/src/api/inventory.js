import { BASE_API } from '../utils/constants'
import { apiFetch } from './apiFetch'

export async function getInventoryApi(branchId) {
  const params = new URLSearchParams({
    branch: String(branchId),
    page_size: '100',
  })
  const url = `${BASE_API}/api/v1/branch-products/?${params}`

  return apiFetch(url, { cache: 'no-store' })
}

export async function addInventoryApi(data, token) {
  const url = `${BASE_API}/api/v1/branch-products/`

  return apiFetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export async function updateInventoryApi(id, data, token) {
  const url = `${BASE_API}/api/v1/branch-products/${id}/`

  return apiFetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
