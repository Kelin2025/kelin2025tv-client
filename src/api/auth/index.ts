import { $uid, $token, $isLogged, authorize } from "./model";

$uid.on(authorize.doneData, (state, { uid }) => uid);

$token.on(authorize.doneData, (state, { token }) => token);

$isLogged.on(authorize.doneData, () => true);

$token.watch((token) => {
  localStorage.token = token;
});
