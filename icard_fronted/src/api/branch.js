import { BASE_API } from "../utils/constants";
import { apiFetch } from "./apiFetch";

export async function getBranchesApi() {
  const url = `${BASE_API}/api/v1/branches/`;

  return apiFetch(url);
}
