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
import { logError } from "@/utils/logError";
import { baseApiURL } from "@/utils/constants";

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
  status?: "UNPAID" | "SUBMITTED" | "SENT" | "RECEIVED";
  proof?: string;
  transactionReferenceId?: string;
};
type HelpStats = {
  memberId: string;
  fullName: string;
  availableBalance: number;
  totalAmountGiven: number;
  pendingHelpCount: number;
  completedHelpCount: number;
  totalAmountReceivedAck: number;
  totalHelpGiven: number;
};
export default function GiveHelpPage() {
  const [helpRequests, setHelpRequests] = useState<HelpRequest[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<HelpRequest | null>(null);
  const [senderId, setSenderId] = useState("");
  const [utrNumber, setUtrNumber] = useState(""); // New state for UTR number
  const [popupData, setPopupData] = useState<{
    receiverId: string;
    transactionReferenceId: string;
    paymentStatus: string;
  } | null>(null);
  const [errorPopup, setErrorPopup] = useState<string | null>(null);
  const authFetch = useAuthFetch();
  const { memberId } = useAuth();
  const [stats, setStats] = useState<HelpStats | null>(null);

  // Move fetchStats outside useEffect so it can be reused
  const fetchStats = async () => {
    if (!memberId) return;
    try {
      const res = await authFetch(
        `${baseApiURL}/dashboard/summary/${memberId}`,
        { method: "GET" },
        true
      );
      const data = await res.json();
      setStats(data.message[0].data); // assuming backend returns a single record
    } catch (error) {
      logError(error, "[GiveHelpPage] fetchStats failed");
    }
  };

  // Move fetchHelpRequests outside useEffect so it can be reused
  const fetchHelpRequests = async () => {
    if (!memberId) return;
    try {
      const response = await authFetch(
        `${baseApiURL}/${memberId}/upliners`,
        { method: "GET" },
        true
      );
      const data: HelpRequest[] = await response.json();
      const normalizeHelpRequest = (req: any): HelpRequest => ({
        ...req,
        status: req.status || "UNPAID"
      });
      const initialized = data.map(normalizeHelpRequest);
      setHelpRequests(initialized);
    } catch (err) {
      logError(err, "[GiveHelpPage] fetchHelpRequests failed");
      setErrorPopup("Failed to load help requests. Try again later.");
    }
  };

  useEffect(() => {
    fetchStats();
  }, [memberId]);

  useEffect(() => {
    fetchHelpRequests();
  }, [memberId]);

  const openHelpModal = (request: HelpRequest) => {
    // Validation: Check if the memberId starts with 'SPLNO4AA4O'
    if (memberId?.startsWith('SPLNO4AA4O')) {
      setErrorPopup("Special members are not required to help their upliners.");
      return;
    }

    setSelectedRequest(request);
    setSenderId(memberId || "");
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!selectedRequest || !utrNumber.trim()) return;

    if (stats && selectedRequest.levelAmount > stats.availableBalance) {
      setErrorPopup("The helping amount exceeds your available balance. Please adjust the amount.");
      return;
    }

    const body = JSON.stringify({
      ofaMemberId: senderId,
      receiverMemberId: selectedRequest.uplinerMemberId,
      receiverMobile: selectedRequest.uplinerMobileNo,
      amount: String(selectedRequest.levelAmount),
      uplinerLevel: String(selectedRequest.uplinerLevel),
      proof: utrNumber,
    });

    try {
      const response = await authFetch(`${baseApiURL}/help/give`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }, true);

      const json = await response.json();

      if (!response.ok) {
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
        // Fetch updated stats and help requests after successful help submission
        fetchStats();
        fetchHelpRequests();
      } else {
        setErrorPopup("No transaction reference ID returned. Upload may have failed.");
      }

    } catch (error) {
      logError(error, "[GiveHelpPage] handleSubmit failed");
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
  <p className="text-4xl font-bold">₹{stats?.availableBalance?.toLocaleString() || "0"}</p>
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
      <span className="font-medium">₹{stats?.totalAmountGiven?.toLocaleString() || "0"}</span>
    </div>
    
    <div className="flex justify-between">
      <span className="text-sm">Pending Requests:</span>
      <span className="font-medium">₹{stats?.pendingHelpCount?.toLocaleString() || "0"}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-sm">Completed Help requests:</span>
      <span className="font-medium">₹{stats?.completedHelpCount?.toLocaleString() || "0"}</span>
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
                      <td className="px-4 py-2">
                        {req.status === "RECEIVED" ? "PAID" : req.status}
                      </td>
                      <td className="px-4 py-2">
                            {req.proof}
                        
                      </td>
                      <td className="px-4 py-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openHelpModal(req)}
                        disabled={req.status !== "UNPAID"}
                        title={req.status !== "UNPAID" ? "Already submitted" : "Click to help"}
                      >
                        {req.status === "SUBMITTED" ? "Waiting Approval" : 
                        req.status === "RECEIVED" ? "Received" : 
                        "Help"}
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
              <Input
                placeholder="Enter UTR Number (mandatory)"
                value={utrNumber}
                onChange={(e) => setUtrNumber(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <Button onClick={handleSubmit} disabled={!utrNumber.trim() || !senderId}>Submit Help</Button>
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