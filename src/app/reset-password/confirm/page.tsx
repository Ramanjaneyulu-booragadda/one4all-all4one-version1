// This file is obsolete. The dynamic route [token]/page.tsx now handles password reset confirmation.
// It is safe to delete this file.

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { Toast } from "@/components/ui/Toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { getResetPasswordConfirmUrl } from "@/utils/constants";

export default function ResetPasswordConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("");
  const [validationError, setValidationError] = useState("");
  const authFetch = useAuthFetch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setShowDialog(false);
    setDialogMsg("");
    if (!token) {
      setValidationError("Invalid or missing reset token.");
      return;
    }
    if (!newPassword || !confirmPassword) {
      setValidationError("Please enter and confirm your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const resetPasswordConfirmUrl = await getResetPasswordConfirmUrl();
      const response = await authFetch(
        resetPasswordConfirmUrl,
        {
          method: "POST",
          body: JSON.stringify({ token, newPassword }),
        },
        false
      );
      const result = await response.json();
      if (response.ok && result.status === "Success") {
        setDialogMsg(result.message?.[0]?.message || "Password reset successful.");
        setShowDialog(true);
        setTimeout(() => router.push("/login"), 2500);
      } else {
        const errorMsg =
          result.message?.[0]?.errorDetails?.description ||
          result.message?.[0]?.status ||
          result.message?.[0]?.message ||
          result.errorDetails?.description ||
          "Failed to reset password.";
        toast.error(errorMsg);
        setDialogMsg(errorMsg);
        setShowDialog(true);
      }
    } catch (err: any) {
      setDialogMsg("Failed to reset password. Please try again.");
      setShowDialog(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-gray-100 dark:bg-gray-700">
      <div className="bg-white dark:bg-transparent dark:border-2 dark:border-[#cdc9e4] w-full max-w-md rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600 dark:text-[#cdc9e4]">
          Set New Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            size="small"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            error={!!validationError && !newPassword}
            helperText={!!validationError && !newPassword ? validationError : ""}
          />
          <TextField
            label="Confirm New Password"
            variant="outlined"
            fullWidth
            size="small"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            error={!!validationError && !!newPassword}
            helperText={!!validationError && !!newPassword ? validationError : ""}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            disabled={loading}
            style={{ backgroundColor: "#5a67d8", color: "#fff" }}
          >
            {loading ? "Resetting..." : "Reset Password"}
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
