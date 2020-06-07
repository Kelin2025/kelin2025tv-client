import { view } from "./lib/router/forest";
import { using } from "forest";
import { setRoutes } from "@/lib/router";

import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";

import { PageRoot } from "@/ui";
import { StyledRoot } from "foliage";

setRoutes([HomePage.route, LoginPage.route, RegisterPage.route]);

using(document.getElementById("app"), () => {
  PageRoot(() => {
    view({
      home: HomePage.view,
      login: LoginPage.view,
      register: RegisterPage.view,
    });
  });
});

using(document.querySelector("head"), StyledRoot);
