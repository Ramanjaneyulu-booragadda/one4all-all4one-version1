"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowDown, Clock, Info } from "lucide-react";
import Link from "next/link";

interface ReceivedHelp {
  id: string;
  name: string;
  amount: string;
  date: string;
  status: "PROCESSING" | "RECEIVED" | "NOT RECEIVED";
  proofUrl?: string;
}

export default function ReceiveHelpPage() {
  // Mock data for help requests and active help
  const [helpList, setHelpList] = useState<ReceivedHelp[]>([
    {
      id: "AH001",
      name: "Alex Thompson",
      amount: "$250",
      date: "2024-04-07",
      status: "PROCESSING",
      proofUrl: "https://via.placeholder.com/150",
    },
    {
      id: "AH002",
      name: "Maria Garcia",
      amount: "$500",
      date: "2024-04-06",
      status: "RECEIVED",
      proofUrl: "https://via.placeholder.com/150",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<ReceivedHelp | null>(null);
  const [status, setStatus] = useState<"PROCESSING" | "RECEIVED" | "NOT RECEIVED">("PROCESSING");
  const [comments, setComments] = useState("");
  
  
  const openModal = (entry: ReceivedHelp) => {
    setSelected(entry);
    setStatus(entry.status);
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!selected) return;
    const updatedList = helpList.map((item) =>
      item.id === selected.id ? { ...item, status } : item
    );
    setHelpList(updatedList);
    setModalOpen(false);
  };

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Your Account Status</CardTitle>
            <CardDescription>Current account eligibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Request Limit:</span>
              <span className="font-medium">$1,500 / month</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Used This Month:</span>
              <span className="font-medium">$850</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Available:</span>
              <span className="font-medium text-green-600">$650</span>
            </div>
            <div className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '56%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-1">56% of monthly limit used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Help Statistics</CardTitle>
            <CardDescription>Your help receiving summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Help Received:</span>
                <span className="font-medium">$8,570</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">This Month:</span>
                <span className="font-medium">$850</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pending Requests:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Completed Helps:</span>
                <span className="font-medium">9</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/receive-help-history" className="text-sm text-blue-600 hover:underline">
              View Detailed History
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Current Help Status</CardTitle>
            <CardDescription>Overall help status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-700 text-xl font-bold">Active</span>
              </div>
              <h3 className="font-medium text-center">You're eligible to receive help</h3>
              <p className="text-xs text-muted-foreground text-center">
                Your account is in good standing and eligible to receive help from the community.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="w-full btn-primary">Request Help Now</Button>
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
                        <th className="h-12 px-4 text-left align-middle font-medium">From</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                  {helpList.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.amount}</td>
                      <td className="px-4 py-2">{item.date}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            item.status === "PROCESSING"
                              ? "bg-blue-100 text-blue-800"
                              : item.status === "RECEIVED"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {item.proofUrl ? (
                          <a
                            href={item.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Download
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-xs">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <Button variant="outline" size="sm" onClick={() => openModal(item)}>
                          Details
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
                <Input disabled value={selected.name} />
              </div>
              <div>
                <Label>Amount</Label>
                <Input disabled value={selected.amount} />
              </div>
              <div>
                <Label>Proof</Label>
                <Input disabled value={selected.proofUrl || "Not Provided"} />
              </div>
              <div>
                <Label>Status</Label>
                <select
                  className="border rounded-md px-3 py-2 w-full text-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                >
                  <option value="RECEIVED">RECEIVED</option>
                  <option value="NOT RECEIVED">NOT RECEIVED</option>
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

    </div>
  );
}
