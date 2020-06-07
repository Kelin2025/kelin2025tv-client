import { Field, Label, Input } from "@/ui";

import { $email, emailChanged } from "../logic/model";

export const EmailField = () => {
  Field(() => {
    Label({ text: "E-Mail" });
    Input({
      attr: {
        value: $email,
      },
      handler: {
        input: emailChanged.prepend((e) => e.target.value),
      },
    });
  });
};
