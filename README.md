# @pyncz/trpc-refresh-token-link

🔃 Refresh token link for [tRPC](https://trpc.io/) client.

Inspired by the tRPC's built-in [`retryLink`](https://github.com/trpc/trpc/blob/1f4a2ead34ba0d1054dd47bfd66d082dc57a04bd/packages/client/src/links/retryLink.ts).

## Install
Just install `@pyncz/trpc-refresh-token-link` with your favorite package manager.
```bash
pnpm install @pyncz/trpc-refresh-token-link
```

## Usage
With the setup below your `trpc` client will try to get a new JWT pair (access and refresh tokens) from your API should it get `401 UNAUTHORIZED`.

```ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { refreshTokenLink } from '@pyncz/trpc-refresh-token-link'

/**
 * A helper client to use in `refreshTokenLink` to fetch a new jwt pair
 * Or you can use a regular http `fetch` if your API supports it
 */
const trpcClient = createTRPCProxyClient<YourAppRouter>({
  transformer,
  links: [
    httpBatchLink({ /* ... */ }),
  ],
})

/**
 * Your actual tRPC client
 */
export const trpc = createTRPCProxyClient<YourAppRouter>({
  transformer: yourTransformer,
  links: [
    refreshTokenLink({
      // Get locally stored refresh token
      getRefreshToken: () => {
        return storage.get('jwt')?.refresh
      },

      // Fetch a new JWT pair by refresh token from your API
      fetchJwtPairByRefreshToken: (refreshToken) => {
        return trpcClient.auth.refreshToken.query({ refreshToken })
      },

      // Callback on JWT pair is successfully fetched with `fetchJwtPairByRefreshToken`
      onJwtPairFetched: (payload) => {
        storage.set('jwt', payload)
      },

      // optional: Callback on JWT refresh request is failed
      onRefreshFailed: () => {
        // Probably you would like to remove stored jwt and log out the user here
        storage.remove('jwt')
      },

      // optional: Callback on a request is failed with UNAUTHORIZED code,
      // before the refresh flow is started
      onUnauthorized: () => {
        // Uh oh, just got 401!
      },
    }),

    httpBatchLink({ /* ... */ }),
  ],
})
```

> **Note**
> While the refresh flow is running, the outgoing requests will be paused until we get a new jwt pair (or get an error).
> 
> We can't hold back *only procedures that require authentication* because we don't know which procedures are protected **beforehand** without additional meta.
