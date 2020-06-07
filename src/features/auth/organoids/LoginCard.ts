import { goTo } from "@/lib/router";
import { h, handler } from "forest";

import { submitPressed } from "../logic/model";

import {
  Card,
  CardHeader,
  VerticalStack,
  CardFooter,
  Stack,
  Button,
  Form,
} from "@/ui";
import { EmailField } from "../atoms/EmailField";
import { PasswordField } from "../atoms/PasswordField";

const goToSignUp = goTo("/signup");

export const LoginCard = () => {
  Card(() => {
    Form(() => {
      handler({ prevent: true }, { submit: submitPressed });
      CardHeader(() => {
        h("h2", { text: "Авторизация" });
      });
      VerticalStack(() => {
        EmailField();
        PasswordField();
      });
      CardFooter(() => {
        Stack(() => {
          Button({ data: { type: "primary" }, text: "Авторизоваться" });
          h("span", { text: "или" });
          Button({
            attr: { type: "button" },
            data: { type: "secondary" },
            text: "Создать аккаунт",
            handler: {
              click: goToSignUp,
            },
          });
        });
      });
    });
  });
};
