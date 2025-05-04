"use client";

import { useEffect, useState } from "react";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowDown, Clock, Info } from "lucide-react";
import Link from "next/link";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner"; // ✅ Using 'sonner' or your toast lib

interface ReceivedHelp {
  id: string;
  receivedFrom: string;
  receivedAmount: string;
  requestReceivedAt: string;
  requestModifiedAt: string;
  status: "PROCESSING" | "RECEIVED" | "NOT RECEIVED" ;
  proofDoc?: string;
  transactionId: string;
  verifiedBy?: string;
}

export default function ReceiveHelpPage() {
  const authFetch = useAuthFetch();
  const { memberId } = useAuth();

  const [helpList, setHelpList] = useState<ReceivedHelp[]>([]);
  const [summaryStats, setSummaryStats] = useState({
    totalReceived: 0,
    thisMonth: 0,
    approved: 0,
    rejected: 0,
    totalRequestCount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<ReceivedHelp | null>(null);
  const [status, setStatus] = useState<"PROCESSING" | "RECEIVED" | "NOT RECEIVED">("PROCESSING");
  const [comments, setComments] = useState("");
  const [successPopup, setSuccessPopup] = useState<string | null>(null);
  const [errorPopup, setErrorPopup] = useState<string | null>(null);

  const [currentHelpStatus, setCurrentHelpStatus] = useState("Not Active");

  // 🔄 Fetch receive help data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authFetch(
          `http://localhost:9090/api/help/receive-help/${memberId}`,
          { method: "GET" },
          true
        );
        const json = await response.json();

        const detailList = json?.message?.[0]?.data?.records || [];
        const summary = json?.message?.[0]?.data?.summary || {};

        setHelpList(
          detailList.map((item: any) => ({
            id: item.paymentID,
            transactionId: item.transactionId,
            receivedFrom: item.receivedFrom,
            receivedAmount: `₹${item.receivedAmount}`,
            requestReceivedAt: item.requestReceivedAt?.split("T")[0],
            requestModifiedAt: item.requestModifiedAt?.split("T")[0],
            status: item.status,
            proofDoc: item.proofDoc,
            verifiedBy: item.memberId, // ✅ Add this
          }))
        );

        setSummaryStats({
          totalReceived: summary.totalReceivedAmount || 0,
          thisMonth: summary.thisMonthReceivedAmount || 0,
          approved: summary.approvedRequestCount || 0,
          rejected: summary.rejectedRequestCount || 0,
          totalRequestCount: summary.totalRequestCount || 0,
        });
      } catch (err) {
        console.error("Error fetching receive help data:", err);
        setError("Unable to load receive help details.");
      } finally {
        setLoading(false);
      }
    };

    if (memberId) fetchData();
  }, [memberId]);

  useEffect(() => {
    // Check if Level 1 upliner has confirmed receipt
    const level1Confirmed = helpList.some(
      (item) => item.status === "RECEIVED" && item.id === "LEVEL_1"
    );

    if (level1Confirmed) {
      setCurrentHelpStatus("Active");
    } else {
      setCurrentHelpStatus("Not Active");
    }
  }, [helpList]);

  const openModal = (entry: ReceivedHelp) => {
    setSelected(entry);
    setStatus("RECEIVED"); // or default to "RECEIVED"
    setModalOpen(true);
  };

  // ✅ Submit status verification
  const handleSubmit = async () => {
    if (!selected || !comments) return;

    try {
      const response = await authFetch(
        "http://localhost:9090/api/help/verify",
        {
          method: "POST",
          body: JSON.stringify({
            paymentId: selected.id,
            status,
            comments,
          }),
          headers: { "Content-Type": "application/json" },
        },
        true
      );

      const json = await response.json();

      if (!response.ok) {
        const backendMessage =
          json?.messageText ||
          json?.errorDetails?.description ||
          "Help verification failed. Try again.";
        setErrorPopup(backendMessage);
        return;
      }

      const record = json?.message?.[0]?.data;

      if (record) {
        setSuccessPopup(
          `Help from ${record.senderMemberId} of ₹${record.submittedAmount} has been ${record.submissionStatus}. Verified by ${record.verifiedBy} on ${new Date(record.verificationDate).toLocaleString()}.`
        );

        // ✅ Update UI status to disable button later
        const updatedList = helpList.map((item) =>
          item.id === selected.id
            ? {
                ...item,
                status: record.submissionStatus,
                verifiedBy: record.verifiedBy,
              }
            : item
        );
        setHelpList(updatedList);
      }

      setModalOpen(false);
      setComments("");
    } catch (err) {
      setErrorPopup("Verification failed. Try again later.");
      console.error("Verification submit error:", err);
    }
  };

  // ⏳ While loading
  if (loading) {
    return <div className="text-center text-sm text-muted-foreground py-10">Loading your receive help data...</div>;
  }

  // ❌ On error
  if (error) {
    return (
      <div className="text-center text-red-600 py-10">
        {error} Please check your connection or try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Receive Help</h1>
          <p className="text-muted-foreground">Request assistance from the community</p>
        </div>
        <Button className="btn-primary">
          <ArrowDown className="mr-2 h-4 w-4" />
          New Help Request
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Help Statistics</CardTitle>
            <CardDescription>Your help receiving summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Help Received:</span>
                <span className="font-medium">₹{summaryStats.totalReceived}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">This Month:</span>
                <span className="font-medium">₹{summaryStats.thisMonth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Approved Request count:</span>
                <span className="font-medium">{summaryStats.approved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Rejected Request count:</span>
                <span className="font-medium">{summaryStats.rejected}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Received Request count:</span>
                <span className="font-medium">{summaryStats.totalRequestCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Current Help Status</CardTitle>
            <CardDescription>Overall help status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="h-28 w-28 rounded-full bg-green-100 flex items-center justify-center">
                <div className={`h-28 w-28 rounded-full flex items-center justify-center ${
                  currentHelpStatus === "Active" ? "bg-green-100" : "bg-red-100"
                }`}>
                  <span
                    className={`text-xl font-bold ${
                      currentHelpStatus === "Active" ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {currentHelpStatus}
                  </span>
                </div>
              </div>
              <h3 className="font-medium text-center">You're eligible to receive help</h3>
              <p className="text-xs text-muted-foreground text-center">
                Your account is in good standing and eligible to receive help from the community.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              className="w-full btn-primary" 
              disabled={currentHelpStatus !== "Active"}
            >
              Request Help Now
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start">
        <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
        <div>
          <h3 className="font-medium">How Receiving Help Works</h3>
          <p className="text-sm text-muted-foreground mt-1">
            When you receive help, your have to verfy the proof and then change the status to "Received" or "Not Received" and click submit buttun with some comments.
            Note since the transactions are made directly via one to one through UPI payments, we are not responsible for any loss of money or any frauds.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Received Help Details</CardTitle>
          <CardDescription>Help that is currently being processed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Received From</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Received Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Transaction ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Request Received At</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Request Modified At</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">status Modified By</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">proof of Documents</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Request Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {helpList.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.receivedFrom}</td>
                      <td className="px-4 py-2">{item.receivedAmount}</td>
                      <td className="px-4 py-2">{item.transactionId}</td>
                      <td className="px-4 py-2">{item.requestReceivedAt}</td>
                      <td className="px-4 py-2">{item.requestModifiedAt}</td>
                      <td className="px-4 py-2">{item.verifiedBy}</td>
                      <td className="px-4 py-2">
                        {item.proofDoc ? (
                          <a href={item.proofDoc} target="_blank" className="text-blue-600 hover:underline text-sm">Download</a>
                        ) : (
                          <span className="text-muted-foreground text-xs">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          item.status === "PROCESSING"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "RECEIVED"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          <Clock className="mr-1 h-3 w-3" />
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <Button
                          variant={(item.status as string) === "RECEIVED" ? "secondary" : "outline"}
                          size="sm"
                          className={(item.status as string) === "RECEIVED" ? "bg-green-100 text-green-800" : ""}
                          onClick={() => openModal(item)}
                          disabled={item.status !== "PROCESSING"}
                        >
                          {(item.status as string) === "RECEIVED" ? "Verified" : "Verify"}
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Review Help Payment</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div>
                <Label>Transaction ID</Label>
                <Input disabled value={selected.id} />
              </div>
              <div>
                <Label>Sender</Label>
                <Input disabled value={selected.receivedFrom} />
              </div>
              <div>
                <Label>Amount</Label>
                <Input disabled value={selected.receivedAmount} />
              </div>
             
              <div>
                <Label>Status</Label>
                <select
                  className="border rounded-md px-3 py-2 w-full text-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "RECEIVED" | "NOT RECEIVED")}
                >
                  <option value="RECEIVED">RECEIVED</option>
                  <option value="NOT_RECEIVED">NOT RECEIVED</option>
                </select>
              </div>
              <div>
                <Label>Comments</Label>
                <Textarea
                  placeholder="Enter any comments..."
                  required
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSubmit} disabled={!comments}>
                  Submit
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
{/* ✅ Success Dialog */}
<Dialog open={!!successPopup} onOpenChange={(open) => !open && setSuccessPopup(null)}>
  <DialogContent className="max-w-md border-green-600 border-2">
    <DialogHeader>
      <DialogTitle className="text-green-600">✅ Help Verified</DialogTitle>
    </DialogHeader>
    <div className="text-sm text-green-700 whitespace-pre-wrap">{successPopup}</div>
    <div className="flex justify-end pt-4">
      <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setSuccessPopup(null)}>OK</Button>
    </div>
  </DialogContent>
</Dialog>


{/* ❌ Error Dialog */}
<Dialog open={!!errorPopup} onOpenChange={() => setErrorPopup(null)}>
  <DialogContent className="max-w-md border-red-600 border-2">
    <DialogHeader>
      <DialogTitle className="text-red-600">❌ Error</DialogTitle>
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
