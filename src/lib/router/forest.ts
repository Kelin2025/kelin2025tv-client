import { variant } from "forest";

import { $currentRoute } from ".";

export const view = (obj) =>
  variant({
    source: $currentRoute,
    key: "name",
    cases: obj,
  });
