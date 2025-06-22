"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/Toast";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { getResetPasswordConfirmUrl } from "@/utils/constants";
import { useAuthFetch } from "@/hooks/useAuthFetch";

export default function ResetPasswordConfirmPage() {
  const router = useRouter();
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
    const token = new URLSearchParams(window.location.search).get("token");
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
      // Use authFetch with useUserToken set to false (only client token)
      const response = await authFetch(
        resetPasswordConfirmUrl,
        {
          method: "POST",
          body: JSON.stringify({ token, newPassword })
        },
        false // Only client token, no user token
      );
      const result = await response.json();
      // Handle expired/used link as a special case
      const isResetFailed = result.message?.[0]?.status === "Reset Failed";
      if (response.ok && result.status === "Success" && !isResetFailed) {
        setDialogMsg(result.message?.[0]?.message || result.message?.[0]?.status || "Password reset successful.");
        setShowDialog(true);
        setTimeout(() => router.push("/login"), 2500);
      } else {
        // Prefer errorDetails from message[0] or top-level errorDetails if present
        const errorMsg =
          result.message?.[0]?.errorDetails?.description ||
          result.message?.[0]?.status ||
          result.message?.[0]?.message ||
          result.errorDetails?.description ||
          "Failed to reset password.";
        setDialogMsg(errorMsg);
        setShowDialog(true);
        // Navigate to login after user closes the dialog
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
          type="error"
          message={dialogMsg}
          onClose={() => {
            setShowDialog(false);
            router.push("/login");
          }}
        />
      )}
    </div>
  );
}
