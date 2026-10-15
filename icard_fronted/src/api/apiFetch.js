export async function apiFetch(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    let errorData = null;

    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }

    throw new Error(
      errorData?.detail ||
        errorData?.message ||
        `Error HTTP ${response.status}`,
    );
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
}
