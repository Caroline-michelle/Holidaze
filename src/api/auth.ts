import { apiFetch } from "./client";

export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
};

export function loginUser(data: LoginData) {
  return apiFetch("/auth/login?_holidaze=true", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function registerUser(data: RegisterData) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
