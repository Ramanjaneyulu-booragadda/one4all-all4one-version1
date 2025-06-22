"use client";
import { useState, useEffect } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toast } from "@/components/ui/Toast";
import { useAuth } from "@/context/AuthContext";
import { getProfileUrl } from "@/utils/constants";
import { logError } from "@/utils/logError";
import { useRouter } from "next/navigation";

export default function MyAccountPage() {
  const router = useRouter();
  const authFetch = useAuthFetch();
  const { memberId } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    consumerNumber: "",
    parentConsumerNumber: "",
    accountCreatedDate: "",
    accountStatus: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!memberId) {
      router.replace("/login");
      return;
    }
    const fetchAccountDetails = async () => {
      try {
        const profileUrl = await getProfileUrl();
        const response = await authFetch(
          `${profileUrl}/${memberId}`,
          { method: "GET" },
          true
        );

        const { message } = await response.json();
        if (message && message[0]?.member) {
          const member = message[0].member[0];
          setFormData({
            fullName: member.fullName,
            email: member.email,
            phoneNumber: member.phoneNumber,
            address: member.address,
            consumerNumber: member.consumerNumber,
            parentConsumerNumber: member.parentConsumerNumber,
            accountCreatedDate: member.accountCreatedDate,
            accountStatus: member.accountStatus,
          });
        }
      } catch (error) {
        logError(error, "[MyAccountPage] fetchAccountDetails failed");
      }
    };

    fetchAccountDetails();
  }, [memberId]);

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const profileUrl = await getProfileUrl();
      const response = await authFetch(`${profileUrl}/${memberId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      const { statusMessage } = await response.json();
      setToastType("success");
      setToastMessage(statusMessage || "Profile updated successfully");
    } catch (error) {
      logError(error, "[MyAccountPage] handleUpdate failed");
      setToastType("error");
      setToastMessage("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">My Account</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <Input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Consumer Number</label>
          <Input
            name="consumerNumber"
            value={formData.consumerNumber}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Parent Consumer Number</label>
          <Input
            name="parentConsumerNumber"
            value={formData.parentConsumerNumber}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Account Created Date</label>
          <Input
            name="accountCreatedDate"
            value={formData.accountCreatedDate}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Account Status</label>
          <Input
            name="accountStatus"
            value={formData.accountStatus}
            disabled
          />
        </div>
      </div>
      <Button onClick={handleUpdate} disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Profile"}
      </Button>
      {toastType && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => {
            setToastType(null);
            setToastMessage("");
          }}
        />
      )}
    </div>
  );
}
