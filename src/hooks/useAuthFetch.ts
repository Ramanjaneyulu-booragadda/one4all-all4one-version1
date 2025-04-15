// hooks/useAuthFetch.ts

/**
 * useAuthFetch.ts
 * ------------------------
 * This custom hook is a secure and reusable wrapper around the native `fetch()` API.
 * It helps you make authenticated HTTP requests by:
 *
 * ✅ Automatically injecting the client token (OAuth2 client_credentials)
 * ✅ Optionally adding the user token (after login)
 * ✅ Normalizing all types of header formats (`Headers`, `string[][]`, or object)
 * ✅ Making your API requests safer, cleaner, and more consistent across the app
 *
 * 🔐 Security Focus:
 * - All tokens are stored only in memory (not localStorage/sessionStorage)
 * - This avoids exposure to XSS attacks while still maintaining clean logic
 *
 * Example Usage:
 * const authFetch = useAuthFetch();
 * await authFetch("/api/protected", { method: "GET" });
 */

import { getClientToken } from "../utils/tokenService";
import { useAuth } from "../context/AuthContext";

/**
 * useAuthFetch
 * -----------------
 * Hook that returns a fetch wrapper with built-in auth header injection.
 */
export const useAuthFetch = () => {
  const { userToken } = useAuth(); // Get user token from global context

  /**
   * normalizeHeaders
   * -----------------
   * Ensures headers are always a plain object: Record<string, string>
   * This prevents runtime errors and TypeScript type issues with HeadersInit.
   *
   * @param headersInit - Can be a Headers object, array, or plain object
   * @returns Normalized headers as a plain object
   */
  const normalizeHeaders = (
    headersInit: HeadersInit = {}
  ): Record<string, string> => {
    const normalized: Record<string, string> = {};

    // If it's a Headers object (from native fetch), convert to plain object
    if (headersInit instanceof Headers) {
      headersInit.forEach((value, key) => {
        normalized[key] = value;
      });
    }
    // If it's an array of [key, value] pairs
    else if (Array.isArray(headersInit)) {
      headersInit.forEach(([key, value]) => {
        normalized[key] = value;
      });
    }
    // If it's already an object
    else {
      Object.assign(normalized, headersInit);
    }

    return normalized;
  };

  /**
   * authFetch
   * -------------------
   * The actual wrapped fetch function with auth logic built-in.
   *
   * @param url - The API endpoint to fetch
   * @param options - Optional fetch options like method, body, headers, etc.
   * @param useUserToken - Set to false if the endpoint does NOT require user token (e.g. register, login)
   *
   * @returns A standard fetch Response object
   */
  const authFetch = async (
    url: string,
    options: RequestInit = {},
    useUserToken: boolean = true
  ): Promise<Response> => {
    // 🔐 Get the cached client token from memory or generate if missing
    const clientToken = await getClientToken();

    // 🎯 Normalize the headers to a safe plain object
    const baseHeaders = normalizeHeaders(options.headers);

    /// Inject defaults only if not already provided (don't overwrite custom headers like "roles")
if (!("Content-Type" in baseHeaders)) {
  baseHeaders["Content-Type"] = "application/json";
}
if (!("Accept" in baseHeaders)) {
  baseHeaders["Accept"] = "application/json";
}


    // 🔐 Add authorization headers
    if (useUserToken && userToken) {
      // Use both user token and client token
      baseHeaders["Authorization"] = `Bearer ${userToken}`;
      baseHeaders["Client-Authorization"] = `Bearer ${clientToken}`;
    } else {
      // Use client token only
      baseHeaders["Client-Authorization"] = `Bearer ${clientToken}`;
    }

    // 🚀 Perform the actual fetch call with prepared headers
    return fetch(url, {
      ...options,
      headers: baseHeaders
    });
  };

  return authFetch;
};
