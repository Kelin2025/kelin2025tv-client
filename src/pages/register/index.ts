import { guard, combine } from "effector";
import { goTo, $currentRoute, redirect } from "@/lib/router";

import { $isLogged } from "@/api/auth/model";

import { RegisterCard } from "@/features/register";

redirect({
  from: { name: "register" },
  to: { name: "home" },
  condition: $isLogged.map(() => true),
});

export const RegisterPage = {
  route: {
    name: "register",
    path: "/signup",
  },
  view: () => {
    RegisterCard();
  },
};
