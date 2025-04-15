/**
 * tokenService.ts
 * ----------------
 * This module manages authentication tokens for your application.
 * It supports:
 *  - Securely fetching and caching the Client Token (from Spring Boot OAuth2)
 *  - Setting and getting the User Token after login
 *  - Clearing tokens on logout
 *
 * 📌 Client Token: Used for app-level authentication (client_credentials grant)
 * 📌 User Token:   Used after user login (authenticated per user session)
 *
 * ❗ Tokens are stored in memory only — safer than localStorage/sessionStorage
 */

// Store tokens in memory (module-level variables)
let clientToken: string | null = null;
let userToken: string | null = null;
let memberId: string | null = null;
/**
 * getClientToken()
 * ----------------
 * Requests a new OAuth2 Client Token from the backend
 * if it doesn't already exist in memory.
 *
 * 🔐 Uses Basic Auth with client credentials.
 * ⚠️ NEVER expose these credentials in frontend for public users.
 */
export const getClientToken = async (): Promise<string> => {
  if (clientToken) {
    // ✅ Reuse existing token
    console.log("📦 Reusing cached client token:", clientToken);
    return clientToken!;
  }
  console.log("🚀 Fetching new client token from /oauth2/token");
// 🔐 Request token from Spring Boot Authorization Server
const res = await fetch("http://localhost:9090/oauth2/token", {
    method: "POST",
    headers: {
      // Client credentials (base64 encoded)
      Authorization: `Basic ${btoa("one4all:Oldisgold@2025")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      scope: "read"
    })
  });

  if (!res.ok) {
    console.error("❌ Failed to get client token:", res.status);
    throw new Error("Failed to get client token");
  }

  const data = await res.json();
  if (!data?.access_token) {
    console.error("❌ access_token not present in response:", data);
    throw new Error("Access token not present in response");
  }
  if (data?.access_token) {
    clientToken = data.access_token;
    console.log("✅ New client token received:", clientToken); // ✅ This will confirm it's fetched
    return clientToken!;
  }
  // 🛑 SAFETY NET: if no token and no error thrown yet, explicitly throw
  throw new Error("No access_token found in response");
};

/**
 * getUserToken()
 * --------------
 * Returns the current user token (JWT).
 * This token is obtained during login and stored via setUserToken().
 */
export const getUserToken = (): string | null => {
  return userToken;
};

/**
 * setUserToken(token)
 * -------------------
 * Stores the logged-in user's token in memory.
 * Typically called after a successful login.
 *
 * @param token - The JWT token returned by backend login API
 */
export const setUserToken = (token: string) => {
  userToken = token;
};

/**
 * clearTokens()
 * -------------
 * Clears both client and user tokens.
 * Should be called on logout or session timeout.
 */
export const clearTokens = () => {
  clientToken = null;
  userToken = null;
};

export const setMemberId = (id: string) => {
  memberId = id;
};

export const getMemberId = (): string | null => {
  return memberId;
};