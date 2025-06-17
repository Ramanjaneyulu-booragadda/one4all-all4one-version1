"use client";

import { useState } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { Toast } from "@/components/ui/Toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { resetPasswordRequestUrl } from "@/utils/constants";

export default function ResetPasswordRequestPage() {
  const [input, setInput] = useState("");
  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [isEmail, setIsEmail] = useState(true);
  const [validationError, setValidationError] = useState("");
  const authFetch = useAuthFetch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setLoading(true);
    setShowDialog(false);
    setDialogMsg("");
    setIsEmail(input.includes("@"));
    // Validation
    if (!memberId.trim()) {
      setValidationError("Member ID is required.");
      setLoading(false);
      return;
    }
    if (input.includes("@")) {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input)) {
        setValidationError("Please enter a valid email address.");
        setLoading(false);
        return;
      }
    } else {
      // Mobile validation: must start with +91 and be 13 chars (+91XXXXXXXXXX)
      const mobileRegex = /^\+91[0-9]{10}$/;
      if (!mobileRegex.test(input)) {
        setValidationError("Please enter a valid Indian mobile number with country code (+91XXXXXXXXXX).");
        setLoading(false);
        return;
      }
    }
    try {
      const body = input.includes("@")
        ? { memberId, email: input }
        : { memberId, mobile: input };
      const response = await authFetch(
        resetPasswordRequestUrl,
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        false
      );
      const result = await response.json();
      if (response.ok && result.status === "Success" && result.message?.[0]?.status !== "Reset Failed") {
        setDialogMsg(result.message?.[0]?.message || result.message?.[0]?.status || "Password reset link sent. Please check your email or mobile.");
        setShowDialog(true);
      } else {
        // Prefer errorDetails from message[0] or top-level errorDetails if present
        const errorMsg =
          result.message?.[0]?.errorDetails?.description ||
          result.message?.[0]?.status ||
          result.message?.[0]?.message ||
          result.errorDetails?.description ||
          "Failed to send reset link.";
        toast.error(errorMsg);
        setDialogMsg(errorMsg);
        setShowDialog(true);
      }
    } catch (err: any) {
      // Try to read error message from backend response if available
      if (err && err.response) {
        try {
          const errorResult = await err.response.json();
          const errorMsg = errorResult?.message?.[0]?.message || "Failed to send reset link. Please try again.";
          setDialogMsg(errorMsg);
          setShowDialog(true);
        } catch {
          setDialogMsg("Failed to send reset link. Please try again.");
          setShowDialog(true);
        }
      } else {
        setDialogMsg("Failed to send reset link. Please try again.");
        setShowDialog(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-gray-100 dark:bg-gray-700">
      <div className="bg-white dark:bg-transparent dark:border-2 dark:border-[#cdc9e4] w-full max-w-md rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600 dark:text-[#cdc9e4]">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Member ID"
            variant="outlined"
            fullWidth
            size="small"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            required
            error={!!validationError && !memberId.trim()}
            helperText={!!validationError && !memberId.trim() ? validationError : ""}
          />
          <TextField
            label="Email or Mobile Number"
            variant="outlined"
            fullWidth
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            error={!!validationError && !!memberId.trim()}
            helperText={!!validationError && !!memberId.trim() ? validationError : ""}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            disabled={loading}
            style={{ backgroundColor: "#5a67d8", color: "#fff" }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </div>
      {showDialog && (
        <Toast
          type="success"
          message={dialogMsg}
          onClose={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}
