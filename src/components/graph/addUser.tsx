import React, { useState, useEffect } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { baseApiURL } from "@/utils/constants";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function AddUser({ selectedNode, setSelectedNode }) {
  const authFetch = useAuthFetch();
  // State declarations
  const [referralLevel, setReferralLevel] = useState<string>("");
  const [newMemberId, setNewMemberId] = useState<string>("");
  const [unassignedList, setUnassignedList] = useState<string[]>([]);

  // Handle form submission
  //   const handleSubmit = () => {
  //     if (!referralLevel || !newMemberId) {
  //       alert("Please fill in all fields.");
  //       return;
  //     }

  //     // Example logic for handling submission
  //     console.log("Submitting referral:", {
  //       selectedNodeId: selectedNode?.id,
  //       referralLevel,
  //       newMemberId,
  //     });

  //     // Reset form and close modal
  //     setReferralLevel("");
  //     setNewMemberId("");
  //     setSelectedNode(null);
  //   };
  const handleSubmit = async () => {
    if (!referralLevel.trim() || !newMemberId.trim()) {
      alert("❌ Please enter referral level and new member ID.");
      return;
    }

    try {
      const res = await authFetch(
        `${baseApiURL}/addreferer`,
        {
          method: "POST",
          body: JSON.stringify({
            referrerId: selectedNode?.id,
            referralLevel,
            memberId: newMemberId,
          }),
        },
        true
      );

      if (!res.ok) throw new Error("❌ Failed to add referer");

      alert("✅ Referral added successfully!");

      setSelectedNode(null);
      setReferralLevel("");
      setNewMemberId("");

      //   if (onHierarchyRefresh) {
      //     await onHierarchyRefresh();
      //   }
    } catch (err) {
      console.error("Add referer failed:", err);
      alert("❌ Something went wrong.");
    }
  };
  const unassignedMembers = async () => {
    const res = await authFetch(
      `${baseApiURL}/unassigned-members?page=0&size=50`,
      { method: "GET" },
      true
    );
    const data = await res?.json();
    const member = data?.message[0]?.member || [];
    const unassignedList = member.map(
      (item) => `${item.memberId || ""} ${item.ofaFullName} `
    );
    setUnassignedList(unassignedList);
  };
  useEffect(() => {
    unassignedMembers();
  }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          Add Referral for {selectedNode?.id || "N/A"}
        </h2>
        <div className="space-y-4">
          <TextField
            label="Referral Member ID"
            variant="outlined"
            fullWidth
            size="small"
            value={selectedNode?.id || ""}
            disabled
          />

          <TextField
            label="Referral Level"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => setReferralLevel(e.target.value || "")}
          />

          <Autocomplete
            disablePortal
            options={unassignedList}
            fullWidth
            size="small"
            style={{}}
            onChange={(event, value) => {
              if (value) {
                setNewMemberId(value);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="New Member ID" />
            )}
          />
          <div className="flex justify-end space-x-2 pt-4">
            <button
              onClick={() => setSelectedNode(null)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
