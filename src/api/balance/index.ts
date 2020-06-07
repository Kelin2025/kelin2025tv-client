import { $balance, getBalance, enterPromocode } from "./model";

$balance
  .on(getBalance.doneData, (state, { points }) => points)
  .on(enterPromocode.doneData, (state, { points }) => points);
