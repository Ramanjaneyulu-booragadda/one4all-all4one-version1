"use client";

/**
 * AuthContext.tsx
 * ----------------
 * This module provides global authentication state and methods for your Next.js React app.
 *
 * Features:
 * ✅ Stores both user token (after login) and client token (preloaded at app start)
 * ✅ Persists memberId and userToken in memory (via tokenService)
 * ✅ Supports login/logout functionality
 *
 * 📌 Tokens are **not stored in localStorage** for security reasons (XSS protection)
 * 📌 AuthContext can be accessed via the `useAuth()` hook
 *
 * 👇 Usage:
 * - Wrap your app with <AuthProvider> (in layout.tsx or _app.tsx)
 * - Access anywhere using `const { userToken, memberId } = useAuth();`
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import {
  getUserToken,
  setUserToken as setUserTokenInMemory,
  clearTokens,
  getClientToken,
  getMemberId,
  setMemberId as setMemberIdInMemory,
} from "../utils/tokenService";

/**
 * AuthContextType
 * ----------------
 * Defines the shape of our auth state and helper functions.
 */
interface AuthContextType {
  userToken: string | null;
  memberId: string | null;
  isLoggedIn: boolean;
  login: (token: string, memberId: string) => void;
  logout: () => void;
}

// Initialize the context object (no default value needed)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider
 * ----------------
 * Wraps the application and provides authentication context.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string | null>(null);

  /**
   * Effect: On mount, preload the client token and restore user state from memory.
   */
  useEffect(() => {
    // 1. Fetch client token immediately on app load (client_credentials grant)
    (async () => {
      try {
        const token = await getClientToken();
        console.log("🚀 Client token preloaded on app start:", token);
      } catch (err) {
        console.error("❌ Failed to preload client token:", err);
      }
    })();

    // 2. Restore previously saved userToken and memberId from memory (if any)
    const savedUserToken = getUserToken();
    const savedMemberId = getMemberId();
    if (savedUserToken) setUserToken(savedUserToken);
    if (savedMemberId) setMemberId(savedMemberId);
  }, []);

  /**
   * login()
   * -------
   * Called after a successful login API call.
   * Stores userToken and memberId in both tokenService memory and context state.
   */
  const login = (token: string, memberId: string) => {
    setUserTokenInMemory(token);
    setMemberIdInMemory(memberId);

    setUserToken(token);
    setMemberId(memberId);
  };

  /**
   * logout()
   * --------
   * Clears all tokens and member ID on user logout or session expiry.
   */
  const logout = () => {
    clearTokens(); // Removes all tokens from tokenService
    setUserToken(null);
    setMemberId(null);
  };

  /**
   * Provide the state and functions to consumers of this context.
   */
  return (
    <AuthContext.Provider
      value={{
        userToken,
        memberId,
        isLoggedIn: !!userToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth()
 * ---------
 * Custom hook for accessing the AuthContext.
 * Usage: `const { userToken, memberId, login } = useAuth();`
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("❗useAuth must be used inside <AuthProvider>");
  }
  return context;
};
