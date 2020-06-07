import { createStore } from "effector";
import { createApiRoot } from "@/lib/fetch";

export type LoginData = {
  email: string;
  password: string;
};

export type Credentials = {
  uid: string;
  token: string;
};

export const $uid = createStore(null);
export const $token = createStore(localStorage.token || null);
export const $isLogged = createStore(false);

export const createFetch = createApiRoot({
  path: "https://kelin2025-api.herokuapp.com/api",
  token: $token,
});

export const authorize = createFetch<LoginData, Credentials>({
  method: "POST",
  url: "/account/auth",
});

export const register = createFetch<LoginData, Credentials>({
  method: "POST",
  url: "/account/register",
});
