import { h } from "forest";
import { Button } from "@/ui";
import { goTo } from "@/lib/router";

export const HomePage = {
  route: {
    name: "home",
    path: "/",
  },
  view: () => {
    Button({
      text: "Login",
      data: { type: "primary" },
      handler: {
        click: goTo.prepend(() => ({ name: "login", params: {} })),
      },
    });
    h("div", { text: "adsf" });
  },
};
