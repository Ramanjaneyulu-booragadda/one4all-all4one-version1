"use client";

/**
 * LoginPage Component
 * -------------------
 * This is the login form for the application.
 * It uses Next.js (App Router), Tailwind CSS for styling,
 * and connects to a Spring Boot backend for authentication.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { useAuth } from "../../context/AuthContext";
import {loginUrl} from "../../utils/constants";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();         // To save user token     // ✅ Hook must be inside component
  const authFetch = useAuthFetch();      // Secure fetch wrapper using client token   // ✅ Hook must be inside component


  // 🧾 State for form inputs
  const [formData, setFormData] = useState({
    ofaMemberId: "",
    password: ""
  });

  // ❗ Error state for showing login issues
  const [error, setError] = useState<string | null>(null);

  // 🔐 Handle login form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // clear previous errors

    try {
      // 🔐 Use authFetch to include client token in headers
      const response = await authFetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          ofaMemberId: formData.ofaMemberId, // ✅ direct mapping
          ofaPassword: formData.password
        })
      },false);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Login successful:", result);

      // (Optional) Save token if needed
      // localStorage.setItem("token", result.token);
      login(result.message[0].token, result.message[0].member[0].ofaMemberId); // ✅ Store user token globally
      router.push("/dashboard");
    } catch (error) {
      console.error("❌ Login failed:", error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-8 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          {/* 🔷 Brand Icon */}
          <svg className="h-10 w-10 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h10v-2H7v2zm0-4h10V7H7v2z" />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-16 px-8 shadow sm:rounded-lg sm:px-8">
          {/* 🔐 Login Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* 🆔 ofaMemberId Field */}
            <div>
              <label htmlFor="ofaMemberId" className="block text-sm font-medium leading-6 text-gray-900">
                Member ID
              </label>
              <div className="mt-2">
                <input
                  id="ofaMemberId"
                  name="ofaMemberId"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.ofaMemberId}
                  onChange={(e) => setFormData({ ...formData, ofaMemberId: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                             ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                             focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 🔑 Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                             ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                             focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 🔁 Options & Links */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link href="/reset-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* ⚠️ Error Message */}
            {error && (
              <div className="text-red-600 text-sm font-semibold">{error}</div>
            )}

            {/* 🚪 Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm 
                           font-semibold text-white shadow-sm hover:bg-indigo-500 
                           focus-visible:outline focus-visible:outline-2 
                           focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

            {/* ✍️ Registration Link */}
            <div className="flex items-center justify-between text-sm">
              <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                if you Don't have account? click here to register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
