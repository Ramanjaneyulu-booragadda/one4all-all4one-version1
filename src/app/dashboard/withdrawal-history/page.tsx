import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Download, Filter, Search, DollarSign, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function WithdrawalHistoryPage() {
  // Mock data for withdrawal transactions
  const completedWithdrawals = [
    { id: "W001", date: "2024-03-15", amount: "$1,200", status: "Completed", method: "Bank Transfer", reference: "REF-BT-001" },
    { id: "W002", date: "2024-02-28", amount: "$850", status: "Completed", method: "PayPal", reference: "REF-PP-002" },
    { id: "W003", date: "2024-02-10", amount: "$500", status: "Completed", method: "Bank Transfer", reference: "REF-BT-003" },
    { id: "W004", date: "2024-01-22", amount: "$1,000", status: "Completed", method: "Bank Transfer", reference: "REF-BT-004" },
    { id: "W005", date: "2024-01-05", amount: "$750", status: "Completed", method: "PayPal", reference: "REF-PP-005" },
    { id: "W006", date: "2023-12-18", amount: "$600", status: "Completed", method: "Bank Transfer", reference: "REF-BT-006" },
  ];

  const pendingWithdrawals = [
    { id: "W007", date: "2024-04-10", amount: "$1,500", status: "Pending", method: "Bank Transfer", reference: "REF-BT-007" },
    { id: "W008", date: "2024-04-05", amount: "$900", status: "Processing", method: "PayPal", reference: "REF-PP-008" },
  ];

  // Monthly summary data
  const monthlySummary = [
    { month: "April 2024", amount: "$2,400", count: 2 },
    { month: "March 2024", amount: "$1,200", count: 1 },
    { month: "February 2024", amount: "$1,350", count: 2 },
    { month: "January 2024", amount: "$1,750", count: 2 },
    { month: "December 2023", amount: "$600", count: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Withdrawal History</h1>
          <p className="text-muted-foreground">Record of all your withdrawal transactions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="btn-primary" size="sm">
            <DollarSign className="mr-2 h-4 w-4" />
            New Withdrawal
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Total Withdrawn</CardTitle>
            <CardDescription>Lifetime withdrawals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$6,800</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>This Month</CardTitle>
            <CardDescription>April 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$2,400</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Available Balance</CardTitle>
            <CardDescription>Available for withdrawal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$3,500</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Pending Withdrawals</CardTitle>
            <CardDescription>Being processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$2,400</div>
            <p className="text-xs text-muted-foreground mt-1">2 pending transactions</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>Withdrawals by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">Month</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Count</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {monthlySummary.map((item) => (
                      <tr
                        key={item.month}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">{item.month}</td>
                        <td className="p-4 align-middle">{item.amount}</td>
                        <td className="p-4 align-middle">{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Withdrawal Methods</CardTitle>
            <CardDescription>Distribution by payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                  <span className="text-sm">Bank Transfer</span>
                </div>
                <span className="font-medium">$4,300 (63%)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                  <span className="text-sm">PayPal</span>
                </div>
                <span className="font-medium">$2,500 (37%)</span>
              </div>
            </div>

            <div className="mt-6 bg-gray-100 p-3 rounded-md">
              <h3 className="text-sm font-medium mb-2">Withdrawal Limits</h3>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>Minimum withdrawal: $100</li>
                <li>Maximum per transaction: $2,000</li>
                <li>Maximum monthly: $5,000</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2 flex justify-between flex-col sm:flex-row items-start sm:items-center">
          <div>
            <CardTitle>Withdrawal Transactions</CardTitle>
            <CardDescription>All your withdrawal transactions</CardDescription>
          </div>
          <div className="flex mt-2 sm:mt-0 space-x-2">
            <div className="flex items-center relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 h-9 w-full sm:w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Method</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Reference</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {[...pendingWithdrawals, ...completedWithdrawals].map((withdrawal) => (
                        <tr
                          key={withdrawal.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{withdrawal.id}</td>
                          <td className="p-4 align-middle">{withdrawal.date}</td>
                          <td className="p-4 align-middle">{withdrawal.amount}</td>
                          <td className="p-4 align-middle">{withdrawal.method}</td>
                          <td className="p-4 align-middle">{withdrawal.reference}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              withdrawal.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : withdrawal.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {(withdrawal.status === "Pending" || withdrawal.status === "Processing") &&
                                <Clock className="mr-1 h-3 w-3" />
                              }
                              {withdrawal.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>8</strong> of <strong>8</strong> transactions
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Method</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Reference</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {completedWithdrawals.map((withdrawal) => (
                        <tr
                          key={withdrawal.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{withdrawal.id}</td>
                          <td className="p-4 align-middle">{withdrawal.date}</td>
                          <td className="p-4 align-middle">{withdrawal.amount}</td>
                          <td className="p-4 align-middle">{withdrawal.method}</td>
                          <td className="p-4 align-middle">{withdrawal.reference}</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                              {withdrawal.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Method</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Reference</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {pendingWithdrawals.map((withdrawal) => (
                        <tr
                          key={withdrawal.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{withdrawal.id}</td>
                          <td className="p-4 align-middle">{withdrawal.date}</td>
                          <td className="p-4 align-middle">{withdrawal.amount}</td>
                          <td className="p-4 align-middle">{withdrawal.method}</td>
                          <td className="p-4 align-middle">{withdrawal.reference}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              withdrawal.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              <Clock className="mr-1 h-3 w-3" />
                              {withdrawal.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                Cancel
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md flex items-start mt-4">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Withdrawal Processing Times:</p>
                  <p>Bank transfers typically take 2-3 business days to process. PayPal withdrawals are usually processed within 24 hours.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
