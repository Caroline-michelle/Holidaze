const API_BASE_URL = "https://v2.api.noroff.dev";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
      Authorization: localStorage.getItem("accessToken")
        ? `Bearer ${localStorage.getItem("accessToken")}`
        : "",
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Something went wrong");
  }

  return result;
}
