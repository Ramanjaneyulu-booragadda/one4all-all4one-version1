"use client";
import { useEffect, useState } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUp,
  ArrowDown,
  CreditCard,
  Users,
  DollarSign,
  TrendingUp,
  Bell,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import TotalMembersPage from "./My-Team/page";
import { logError } from "@/utils/logError";

export default function DashboardPage() {
  const authFetch = useAuthFetch();
  const { memberId, isAuthReady } = useAuth();

  const [giveHelpStats, setGiveHelpStats] = useState<{
    totalAmountGiven?: number;
    pendingHelpCount?: number;
    completedHelpCount?: number;
  } | null>(null);
  const [receiveHelpStats, setReceiveHelpStats] = useState<{
    totalReceivedAmount?: number;
    thisMonthReceivedAmount?: number;
    approvedRequestCount?: number;
    rejectedRequestCount?: number;
  } | null>(null);

  useEffect(() => {
    if (!memberId) return;

    const fetchGiveHelpStats = async () => {
      try {
        const res = await authFetch(
          `http://localhost:9090/api/dashboard/summary/${memberId}`,
          { method: "GET" },
          true
        );
        const data = await res.json();
        setGiveHelpStats(data.message[0].data);
      } catch (error) {
        logError(error, "[DashboardPage] fetchGiveHelpStats failed");
      }
    };

    const fetchReceiveHelpStats = async () => {
      try {
        const res = await authFetch(
          `http://localhost:9090/api/help/receive-help/${memberId}`,
          { method: "GET" },
          true
        );
        const data = await res.json();
        setReceiveHelpStats(data.message[0].data.summary);
      } catch (error) {
        logError(error, "[DashboardPage] fetchReceiveHelpStats failed");
      }
    };

    fetchGiveHelpStats();
    fetchReceiveHelpStats();
  }, [memberId]);

  if (!isAuthReady) {
    return (
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Welcome, John Doe
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Give Help Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                Total Amount Given: ₹
                {giveHelpStats?.totalAmountGiven || 0}
              </p>
              <p>
                Pending Requests:{" "}
                {giveHelpStats?.pendingHelpCount || 0}
              </p>
              <p>
                Completed Requests:{" "}
                {giveHelpStats?.completedHelpCount || 0}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receive Help Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                Total Amount Received: ₹
                {receiveHelpStats?.totalReceivedAmount || 0}
              </p>
              <p>
                This Month: ₹
                {receiveHelpStats?.thisMonthReceivedAmount || 0}
              </p>
              <p>
                Approved Requests:{" "}
                {receiveHelpStats?.approvedRequestCount || 0}
              </p>
              <p>
                Rejected Requests:{" "}
                {receiveHelpStats?.rejectedRequestCount || 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="give-help" className="space-y-4">
        <TabsList>
          <TabsTrigger value="give-help">Give Help</TabsTrigger>
          <TabsTrigger value="receive-help">Receive Help</TabsTrigger>
        </TabsList>

        <TabsContent value="give-help">
          <GiveHelpSection />
        </TabsContent>
        <TabsContent value="receive-help">
          <ReceiveHelpSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GiveHelpSection() {
  const authFetch = useAuthFetch();
  const { memberId } = useAuth();
  interface GiveHelpItem {
    uplinerLevel: number;
    uplinerMemberId: string;
    uplinerName: string;
    uplinerMobileNo: string;
    levelAmount: number;
    status: string;
    proofUrl?: string;
  }
  
  const [giveHelpData, setGiveHelpData] = useState<GiveHelpItem[]>([]);

  useEffect(() => {
    if (!memberId) return;

    const fetchGiveHelpData = async () => {
      try {
        const response = await authFetch(
          `http://localhost:9090/api/${memberId}/upliners`,
          { method: "GET" },
          true
        );
        const data = await response.json();
        interface GiveHelpItem {
          uplinerLevel: number;
          uplinerMemberId: string;
          uplinerName: string;
          uplinerMobileNo: string;
          levelAmount: number;
          status: string;
          proofUrl?: string;
        }

        const filteredData: GiveHelpItem[] = data.filter(
          (item: GiveHelpItem) => item.status === "RECEIVED"
        );
        setGiveHelpData(filteredData);
      } catch (error) {
        logError(error, "[DashboardPage] GiveHelpSection fetchGiveHelpData failed");
      }
    };

    fetchGiveHelpData();
  }, [memberId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Give Help History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">Level</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Upliner ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Mobile</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {giveHelpData.map((item) => (
                  <tr
                    key={item.uplinerMemberId}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{item.uplinerLevel}</td>
                    <td className="p-4 align-middle">{item.uplinerMemberId}</td>
                    <td className="p-4 align-middle">{item.uplinerName}</td>
                    <td className="p-4 align-middle">{item.uplinerMobileNo}</td>
                    <td className="p-4 align-middle">{item.levelAmount}</td>
                    <td className="p-4 align-middle">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                        {item.status === "RECEIVED" ? "PAID" : item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReceiveHelpSection() {
  const authFetch = useAuthFetch();
  const { memberId } = useAuth();
  interface ReceiveHelpItem {
    paymentID: string;
    receivedFrom: string;
    receivedAmount: number;
    transactionId: string;
    requestReceivedAt?: string;
    requestModifiedAt?: string;
    status: string;
    proofDoc?: string;
  }
  
  const [receiveHelpData, setReceiveHelpData] = useState<ReceiveHelpItem[]>([]);

  useEffect(() => {
    if (!memberId) return;

    const fetchReceiveHelpData = async () => {
      try {
        const response = await authFetch(
          `http://localhost:9090/api/help/receive-help/${memberId}`,
          { method: "GET" },
          true
        );
        const data = await response.json();
        const records = data.message[0].data.records;
        setReceiveHelpData(records);
      } catch (error) {
        logError(error, "[DashboardPage] ReceiveHelpSection fetchReceiveHelpData failed");
      }
    };

    fetchReceiveHelpData();
  }, [memberId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receive Help History</CardTitle>
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
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {receiveHelpData.map((item) => (
                  <tr
                    key={item.paymentID}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{item.paymentID}</td>
                    <td className="p-4 align-middle">{item.receivedFrom}</td>
                    <td className="p-4 align-middle">₹{item.receivedAmount}</td>
                    <td className="p-4 align-middle">{item.transactionId}</td>
                    <td className="p-4 align-middle">{item.requestReceivedAt?.split("T")[0]}</td>
                    <td className="p-4 align-middle">{item.requestModifiedAt?.split("T")[0]}</td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          item.status === "RECEIVED"
                            ? "bg-green-100 text-green-800"
                            : item.status === "PROCESSING"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


