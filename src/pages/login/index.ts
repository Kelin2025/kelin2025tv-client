import { LoginCard } from "@/features/auth";

export const LoginPage = {
  route: {
    name: "login",
    path: "/login",
  },
  view: () => {
    LoginCard();
  },
};
