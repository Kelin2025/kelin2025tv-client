import { createEffect, Store, attach } from "effector";

type Options = {
  path: string;
  token: Store<string>;
};

type Data = {
  method: string;
  url: string;
  options?: {
    headers?: {};
  };
};

export const createApiRoot = ({ path, token }: Options) => {
  const generate = <P, R>({ method, url, options = {} }: Data) => {
    const effect = createEffect<P, R>({
      handler: (body) => {
        return fetch(`${path}${url}`, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
          ...options,
        }).then(async (r) => {
          if (r.status !== 200) {
            throw await r.json();
          } else {
            return r.json();
          }
        });
      },
    });

    return effect;
  };

  const authorizedReq = <P, R>({ method, url, options = {} }: Data) => {
    const effect = createEffect<{ body: P; token: string }, R>({
      handler: ({ body, token }) => {
        return fetch(`${path}${url}`, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers: {
            Authorization: token,
            ...(options.headers || {}),
          },
          ...options,
        }).then(async (r) => {
          if (r.status !== 200) {
            throw await r.json();
          } else {
            return r.json();
          }
        });
      },
    });

    const authorized = attach<P>({
      source: token,
      mapParams: (body, token) => ({ body, token }),
      effect: effect,
    });

    return authorized;
  };

  generate.withToken = authorizedReq;

  return generate;
};
