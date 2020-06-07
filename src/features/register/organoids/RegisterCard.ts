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

export const RegisterCard = () => {
  Card(() => {
    Form(() => {
      handler({ prevent: true }, { submit: submitPressed });
      CardHeader(() => {
        h("h2", { text: "Регистрация" });
      });
      VerticalStack(() => {
        EmailField();
        PasswordField();
      });
      CardFooter(() => {
        Stack(() => {
          Button({ data: { type: "primary" }, text: "Зарегистрироваться" });
          h("span", { text: "или" });
          Button({
            attr: { type: "button" },
            data: { type: "secondary" },
            text: "Войти в аккаунт",
            handler: {
              click: goTo.prepend(() => ({ name: "login", params: {} })),
            },
          });
        });
      });
    });
  });
};
