import type { JwtPair } from './jwt'

export interface RefreshTokenLinkOptions {
  /**
   * Get locally stored refresh token
   * @returns Refresh token string or undefined
   */
  getRefreshToken: () => Promise<string | undefined> | string | undefined

  /**
   * Fetch a new JWT pair by refresh token from your API
   * @param refreshToken Refresh token to use as an input for the API
   * @returns A promise resolving to `{ access: string; refresh: string }`
   */
  fetchJwtPairByRefreshToken: (refreshToken: string) => Promise<JwtPair>

  /**
   * Callback on JWT pair is successfully fetched with `fetchJwtPairByRefreshToken`
   * @param payload Just fetched `{ access: string; refresh: string }` structure
   */
  onJwtPairFetched: (payload: JwtPair) => void

  /**
   * Callback on JWT refresh request is failed
   * @param error The error refresh query is failed with
   */
  onRefreshFailed?: (error: unknown) => void

  /**
   * Callback on a request is failed with UNAUTHORIZED code,
   * before the refresh flow is started
   */
  onUnauthorized?: () => void
}
