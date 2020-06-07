import { createStore } from "effector";
import { createFetch } from "@/api/auth/model";

export const getBalance = createFetch.withToken<null, { points: number }>({
  method: "GET",
  url: "/game/balance",
});

type PromoData = { promocode: string };
type PromoResponse = {
  points: number;
  success: boolean;
  gained: number;
};
export const enterPromocode = createFetch.withToken<PromoData, PromoResponse>({
  method: "POST",
  url: "/game/promocode",
});

export const $balance = createStore(0);
