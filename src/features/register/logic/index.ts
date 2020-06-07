import { sample } from "effector";

import { register } from "@/api/auth/model";
import {
  $email,
  $password,
  emailChanged,
  passwordChanged,
  $formData,
  submitPressed,
} from "./model";

$email.on(emailChanged, (state, value) => value);

$password.on(passwordChanged, (state, value) => value);

sample({
  source: $formData,
  clock: submitPressed,
  target: register,
});
