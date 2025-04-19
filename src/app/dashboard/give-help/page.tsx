"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUp, Info } from "lucide-react";
import Link from "next/link";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ----------------------------------------------------------------------------------
// Type for Help Requests
// ----------------------------------------------------------------------------------
type HelpRequest = {
  id: number;
  memberId: string;
  uplinerLevel: number;
  uplinerMemberId: string;
  uplinerName: string;
  levelAmount: number;
  uplinerMobileNo: string;
  status?: "NOT SENT" | "SUBMITTED" | "SENT";
  proofUrl?: string;
  transactionReferenceId?: string;
};

export default function GiveHelpPage() {
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
  const [senderId, setSenderId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [popupData, setPopupData] = useState<{
    receiverId: string;
    transactionReferenceId: string;
    paymentStatus: string;
  } | null>(null);
  const [errorPopup, setErrorPopup] = useState<string | null>(null);
  const authFetch = useAuthFetch();
  const { memberId } = useAuth();

  useEffect(() => {
    if (!memberId) return;
    const fetchHelpRequests = async () => {
      try {
        const response = await authFetch(
          `http://localhost:9090/api/${memberId}/upliners`,
          { method: "GET" },
          true
        );
        const data: HelpRequest[] = await response.json();
        const initialized: HelpRequest[] = data.map((req: Omit<HelpRequest, "status">) => ({
          ...req,
          status: "NOT SENT"
        }));
        setHelpRequests(initialized);
      } catch (err) {
        console.error("Error fetching help requests:", err);
        setErrorPopup("Failed to load help requests. Try again later.");
      }
    };
    fetchHelpRequests();
  }, [memberId]);

  const openHelpModal = (request: HelpRequest) => {
    setSelectedRequest(request);
    setSenderId(memberId || "");
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!selectedRequest || !file) return;
  
    const formData = new FormData();
    formData.append("ofaMemberId", senderId);
    formData.append("receiverMemberId", selectedRequest.uplinerMemberId);
    formData.append("receiverMobile", selectedRequest.uplinerMobileNo);
    formData.append("submittedAmount", String(selectedRequest.levelAmount)); // ✅ backend expects this
    formData.append("uplinerLevel", String(selectedRequest.uplinerLevel));
    formData.append("proofUrl", file); // ✅ file field stays same
  
    try {
      const response = await authFetch("http://localhost:9090/api/help/give", {
        method: "POST",
        body: formData,
      }, true);
  
      const json = await response.json();
  
      if (!response.ok) {
        // 🔴 Extract backend error if available
      const backendMessage =
      json?.messageText ||
      json?.errorDetails?.description ||
      "Help submission failed. Please try again.";
    setErrorPopup(backendMessage);
    return;
      }
  
      const record = json.message?.[0]?.data;
      if (record?.submissionReferenceId) {
        setPopupData({
          receiverId: record.receiverMemberId,
          transactionReferenceId: record.submissionReferenceId,
          paymentStatus: record.submissionStatus,
        });
      } else {
        setErrorPopup("No transaction reference ID returned. Upload may have failed.");
      }
  
    } catch (error) {
      console.error("Unexpected error submitting help:", error);
      setErrorPopup("Something went wrong. Please try again later.");
    } finally {
      setModalOpen(false);
    }
  };
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Give Help</h1>
          <p className="text-muted-foreground">Extend a helping hand to others in need</p>
        </div>
        <Button className="btn-primary">
          <ArrowUp className="mr-2 h-4 w-4" />
          New Help Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Available Balance</CardTitle>
            <CardDescription>Your current balance available for giving help</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold">₹2,500</p>
            <p className="text-sm text-muted-foreground mt-1">Last updated: Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Help Statistics</CardTitle>
            <CardDescription>Your help giving summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Help Given:</span>
                <span className="font-medium">₹12,345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">This Month:</span>
                <span className="font-medium">₹1,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pending Requests:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Completed Helps:</span>
                <span className="font-medium">15</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/give-help-history" className="text-sm text-blue-600 hover:underline">
              View Detailed History
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start">
        <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
        <div>
          <h3 className="font-medium">How Giving Help Works</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Below section shows upliners to whom you should send money via UPI. Upload payment proof (PDF/image).
            We are not responsible for any direct loss/fraud as transactions are one-to-one.
          </p>
        </div>
      </div>

      {/* Help Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Help Requests</CardTitle>
          <CardDescription>These upliners are eligible to receive help</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Level</th>
                    <th className="px-4 py-2">Upliner ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Mobile</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Proof</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {helpRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="px-4 py-2">{req.uplinerLevel}</td>
                      <td className="px-4 py-2">{req.uplinerMemberId}</td>
                      <td className="px-4 py-2">{req.uplinerName}</td>
                      <td className="px-4 py-2">{req.uplinerMobileNo}</td>
                      <td className="px-4 py-2">{req.levelAmount}</td>
                      <td className="px-4 py-2">{req.status}</td>
                      <td className="px-4 py-2">
                        {req.proofUrl ? (
                          <a href={req.proofUrl} target="_blank" className="text-blue-600 hover:underline text-sm">Download</a>
                        ) : (
                          <span className="text-muted-foreground text-xs">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <Button variant="outline" size="sm" onClick={() => openHelpModal(req)}>
                          Help
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit Help Payment</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <Input disabled value={selectedRequest.uplinerLevel} />
              <Input disabled value={selectedRequest.uplinerMemberId} />
              <Input disabled value={selectedRequest.uplinerName} />
              <Input disabled value={selectedRequest.uplinerMobileNo} />
              <Input disabled value={selectedRequest.levelAmount} />
              <Input value={senderId} onChange={(e) => setSenderId(e.target.value)} />
              <Input type="file" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <div className="flex justify-end">
                <Button onClick={handleSubmit} disabled={!file || !senderId}>Submit Help</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ✅ Success Dialog */}
      <Dialog open={!!popupData} onOpenChange={(open) => !open && setPopupData(null)}>
        <DialogContent className="max-w-md border-green-600 border-2">
          <DialogHeader>
            <DialogTitle className="text-green-600">✅ Help Submitted Successfully</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <p><strong>Receiver ID:</strong> {popupData?.receiverId}</p>
            <p><strong>Transaction ID:</strong> {popupData?.transactionReferenceId}</p>
            <p><strong>Status:</strong> {popupData?.paymentStatus}</p>
          </div>
          <div className="flex justify-end pt-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => {
              if (popupData) {
                const updated = helpRequests.map((req) => {
                  if (req.uplinerMemberId === popupData.receiverId) {
                    return {
                      ...req,
                      status: popupData.paymentStatus as HelpRequest["status"],
                      transactionReferenceId: popupData.transactionReferenceId,
                    };
                  }
                  return req;
                });
                setHelpRequests(updated);
              }
              setPopupData(null);
            }}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ❌ Error Dialog */}
      <Dialog open={!!errorPopup} onOpenChange={() => setErrorPopup(null)}>
        <DialogContent className="max-w-md border-red-600 border-2">
          <DialogHeader>
            <DialogTitle className="text-red-600">❌ Submission Failed</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-red-700">{errorPopup}</div>
          <div className="flex justify-end pt-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setErrorPopup(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}