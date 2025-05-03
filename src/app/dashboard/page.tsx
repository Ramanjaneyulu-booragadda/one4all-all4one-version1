"use client";
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
import TotalMembersPage from "./total-members/page";
import { useAuth } from "@/context/AuthContext"; // Add this import
import { useEffect } from "react";
export default function DashboardPage() {
  const { isAuthReady } = useAuth(); // Use auth readiness state

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Given</CardTitle>
            <ArrowUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Received
            </CardTitle>
            <ArrowDown className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,570</div>
            <p className="text-xs text-muted-foreground">
              +10.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Pending Withdrawals
            </CardTitle>
            <DollarSign className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,890</div>
            <p className="text-xs text-muted-foreground">2 pending requests</p>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Recent Activity
            </CardTitle>
            <Bell className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">New notifications</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="give-help" className="space-y-4">
        <TabsList>
          <TabsTrigger value="give-help">Give Help</TabsTrigger>
          <TabsTrigger value="receive-help">Receive Help</TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
          <TabsTrigger value="recent-help">Recent Help</TabsTrigger>
        </TabsList>

        <TabsContent value="give-help" className="space-y-4">
          <GiveHelpSection />
        </TabsContent>
        <TabsContent value="receive-help" className="space-y-4">
          <ReceiveHelpSection />
        </TabsContent>
        <TabsContent value="payment-history" className="space-y-4">
          <PaymentHistorySection />
        </TabsContent>
        <TabsContent value="recent-help" className="space-y-4">
          <RecentHelpSection />
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="total-members" className="space-y-4">
        <TabsContent value="total-members" className="space-y-4">
          <TotalMembersPage />
        </TabsContent>
      </Tabs>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="dashboard-card col-span-2">
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">
                Account statistics chart
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/dashboard/give-help"
                className="block w-full p-2 text-center rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                Give Help
              </Link>
              <Link
                href="/dashboard/receive-help"
                className="block w-full p-2 text-center rounded-md bg-green-100 text-green-700 hover:bg-green-200"
              >
                Receive Help
              </Link>
              <Link
                href="/dashboard/withdrawal"
                className="block w-full p-2 text-center rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              >
                Request Withdrawal
              </Link>
              <Link
                href="/dashboard/my-account"
                className="block w-full p-2 text-center rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200"
              >
                Update Profile
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GiveHelpSection() {
  const giveHelpData = [
    {
      id: "GH001",
      date: "2023-10-15",
      amount: "$500",
      status: "Completed",
      recipient: "Jane Smith",
    },
    {
      id: "GH002",
      date: "2023-11-02",
      amount: "$750",
      status: "Completed",
      recipient: "Mike Johnson",
    },
    {
      id: "GH003",
      date: "2023-12-18",
      amount: "$1,200",
      status: "Completed",
      recipient: "Sarah Williams",
    },
    {
      id: "GH004",
      date: "2024-01-05",
      amount: "$350",
      status: "Pending",
      recipient: "Robert Brown",
    },
  ];

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
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    ID
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Amount
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Recipient
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {giveHelpData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{item.id}</td>
                    <td className="p-4 align-middle">{item.date}</td>
                    <td className="p-4 align-middle">{item.amount}</td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 align-middle">{item.recipient}</td>
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
  const receiveHelpData = [
    {
      id: "RH001",
      date: "2023-09-20",
      amount: "$650",
      status: "Received",
      sender: "Alex Thompson",
    },
    {
      id: "RH002",
      date: "2023-10-07",
      amount: "$800",
      status: "Received",
      sender: "Lisa Anderson",
    },
    {
      id: "RH003",
      date: "2023-11-15",
      amount: "$450",
      status: "Received",
      sender: "David Wilson",
    },
    {
      id: "RH004",
      date: "2024-01-10",
      amount: "$900",
      status: "Pending",
      sender: "Emma Davis",
    },
  ];

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
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    ID
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Amount
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Sender
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {receiveHelpData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{item.id}</td>
                    <td className="p-4 align-middle">{item.date}</td>
                    <td className="p-4 align-middle">{item.amount}</td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          item.status === "Received"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 align-middle">{item.sender}</td>
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

function PaymentHistorySection() {
  const paymentHistoryData = [
    {
      id: "P001",
      date: "2023-10-05",
      amount: "$500",
      method: "Credit Card",
      type: "Give Help",
    },
    {
      id: "P002",
      date: "2023-10-20",
      amount: "$650",
      method: "Bank Transfer",
      type: "Receive Help",
    },
    {
      id: "P003",
      date: "2023-11-12",
      amount: "$800",
      method: "Credit Card",
      type: "Give Help",
    },
    {
      id: "P004",
      date: "2023-12-01",
      amount: "$450",
      method: "Bank Transfer",
      type: "Receive Help",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    ID
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Amount
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Method
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {paymentHistoryData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{item.id}</td>
                    <td className="p-4 align-middle">{item.date}</td>
                    <td className="p-4 align-middle">{item.amount}</td>
                    <td className="p-4 align-middle">{item.method}</td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          item.type === "Give Help"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.type}
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

function RecentHelpSection() {
  const recentHelpData = [
    {
      id: "RR001",
      date: "2024-01-15",
      amount: "$750",
      status: "Pending",
      sender: "Michael Scott",
    },
    {
      id: "RR002",
      date: "2024-01-10",
      amount: "$500",
      status: "Received",
      sender: "Jim Halpert",
    },
    {
      id: "RR003",
      date: "2024-01-05",
      amount: "$900",
      status: "Received",
      sender: "Pam Beesly",
    },
    {
      id: "RR004",
      date: "2024-01-01",
      amount: "$600",
      status: "Received",
      sender: "Dwight Schrute",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Receive Help</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    ID
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Amount
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Sender
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {recentHelpData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{item.id}</td>
                    <td className="p-4 align-middle">{item.date}</td>
                    <td className="p-4 align-middle">{item.amount}</td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          item.status === "Received"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 align-middle">{item.sender}</td>
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
