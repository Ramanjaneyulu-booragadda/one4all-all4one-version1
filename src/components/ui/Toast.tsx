"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose?: () => void;
  successData?: {
    MemberID?: string;
    emailid?: string;
    Mobile?: string;
  };
}

export const Toast = ({ message, type, onClose, successData }: ToastProps) => {
  const showSuccessData = type === "success" && successData;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className={`bg-white border shadow-xl rounded-lg p-6 w-full max-w-md text-center`}>
        <p className={`text-lg font-semibold mb-2 ${type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>

        {type === "success" && successData && (
  <div className="text-sm text-gray-700 mt-2 text-left space-y-1">
    {successData.MemberID && (
      <p><strong>Member ID:</strong> {successData.MemberID}</p>
    )}
    {successData.emailid && (
      <p><strong>Email:</strong> {successData.emailid}</p>
    )}
    {successData.Mobile && (
      <p><strong>Mobile:</strong> {successData.Mobile}</p>
    )}
  </div>
)}


        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow"
        >
          OK
        </button>
      </div>
    </div>
  );
};
