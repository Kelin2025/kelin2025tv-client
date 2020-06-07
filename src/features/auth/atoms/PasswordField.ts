import { Field, Label, Input } from "@/ui";

import { $password, passwordChanged } from "../logic/model";

export const PasswordField = () => {
  Field(() => {
    Label({ text: "Password" });
    Input({
      attr: {
        value: $password,
        type: "password",
      },
      handler: {
        input: passwordChanged.prepend((e) => e.target.value),
      },
    });
  });
};
