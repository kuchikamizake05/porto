const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Helper untuk GET request
 */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);

  if (!res.ok) {
    throw new Error(`GET ${path} failed`);
  }

  return res.json();
}

/**
 * Helper untuk POST request
 */
export async function apiPost<T>(
  path: string,
  body: unknown
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`POST ${path} failed`);
  }

  return res.json();
}

/**
 * Helper untuk PUT request (update)
 */
export async function apiPut<T>(
  path: string,
  body: unknown
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`PUT ${path} failed`);
  }

  return res.json();
}

/**
 * Helper untuk DELETE request
 */
export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`DELETE ${path} failed`);
  }

  return res.json();
}
