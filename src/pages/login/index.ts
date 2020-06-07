import { redirect } from "@/lib/router";

import { $isLogged } from "@/api/auth/model";

import { LoginCard } from "@/features/auth";

// redirect({
//   from: { name: "login" },
//   to: { name: "home" },
//   condition: $isLogged,
// });

export const LoginPage = {
  route: {
    name: "login",
    path: "/login",
  },
  view: () => {
    LoginCard();
  },
};
