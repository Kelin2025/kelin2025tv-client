import { attach, forward } from "effector";

import { authorize } from "@/api/auth/model";
import {
  $email,
  $password,
  $formData,
  emailChanged,
  passwordChanged,
  submitPressed,
  $error,
} from "./model";

const processAuth = attach({
  source: $formData,
  effect: authorize,
  mapParams: (p, state) => state,
});

$email.on(emailChanged, (state, value) => value);

$password.on(passwordChanged, (state, value) => value);

$error
  .on(processAuth.done, () => "")
  .on(processAuth.failData, (state, err) => err.detail);

forward({
  from: submitPressed,
  to: processAuth,
});

$error.watch(console.log);

processAuth.failData.watch(console.log);
