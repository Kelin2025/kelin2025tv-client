import { createStore, createEvent, combine } from "effector";

export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const submitPressed = createEvent<any>();

export const $email = createStore<string>("");
export const $password = createStore<string>("");

export const $formData = combine({
  email: $email,
  password: $password,
});
