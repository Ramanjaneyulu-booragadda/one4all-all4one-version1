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
import { loginUrl } from "../../utils/constants";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth(); // To save user token     // ✅ Hook must be inside component
  const authFetch = useAuthFetch(); // Secure fetch wrapper using client token   // ✅ Hook must be inside component

  // 🧾 State for form inputs
  const [formData, setFormData] = useState({
    ofaMemberId: "",
    password: "",
  });

  // ❗ Error state for showing login issues
  const [error, setError] = useState<string | null>(null);

  // 🔐 Handle login form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.ofaMemberId !== "" || formData.password !== "") {
      setError(null); // clear previous errors

      try {
        // 🔐 Use authFetch to include client token in headers
        const response = await authFetch(
          loginUrl,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              ofaMemberId: formData.ofaMemberId, // ✅ direct mapping
              ofaPassword: formData.password,
            }),
          },
          false
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // console.log("✅ Login successful:", result);
        toast.success("Login successful!", { theme: "colored" });

        // (Optional) Save token if needed
        // localStorage.setItem("token", result.token);
        login(result.message[0].token, result.message[0].member[0].ofaMemberId); // ✅ Store user token globally
        router.push("/dashboard");
      } catch (error) {
        console.error("❌ Login failed:", error);
        setError("Please check your credentials and try again.");
        toast.error(
          "Login failed. Please check your credentials and try again.",
          { theme: "colored" }
        );
        toast.success(
          "Login failed. Please check your credentials and try again.",
          { theme: "colored" }
        );
      }
    } else {
      // toast.error("Please fill in all fields.", { theme: "colored" });
      // console.log("❌ Please fill in all fields.");
      toast.warning("Please enter MemberId and password.", {
        theme: "colored",
      });
      setError("Please enter MemberId and password.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-gray-100 dark:bg-gray-700">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-8 md:mt-2 text-center text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
          Sign in to your account
        </h2>
      </div>

      <div className=" bg-white dark:bg-gray-200 mt-6 sm:mx-auto sm:w-full sm:max-w-md shadow sm:rounded-lg sm:px-8 lg:px-8">
        <div className="flex justify-center pt-5 pb-2">
          {/* 🔷 Brand Icon */}
          <svg
            className="h-10 w-10 text-indigo-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-7h10v-2H7v2zm0-4h10V7H7v2z" />
          </svg>
        </div>
        <div className=" pt-5 pb-16 px-8 ">
          {/* 🔐 Login Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Member ID"
                variant="outlined"
                fullWidth
                sx={{}}
                onChange={(e) =>
                  setFormData({ ...formData, ofaMemberId: e.target.value })
                }
              />
            </div>

            {/* 🔑 Password Field */}
            <div>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{}}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
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
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="/reset-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
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
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign in
              </Button>
            </div>

            {/* ✍️ Registration Link */}
            <div className="flex items-center justify-between text-sm">
              <Link
                href="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                if you Don't have account? click here to register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
