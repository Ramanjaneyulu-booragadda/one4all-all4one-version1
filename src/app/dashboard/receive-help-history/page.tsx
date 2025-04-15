import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, Calendar, Clock, Download, Filter, Search } from "lucide-react";

export default function ReceiveHelpHistoryPage() {
  // Mock data for completed and pending help
  const completedHelp = [
    { id: "RH1001", sender: "John Williams", amount: "$650", date: "2024-03-12", status: "Received", category: "Medical" },
    { id: "RH1002", sender: "Emma Davis", amount: "$800", date: "2024-02-25", status: "Received", category: "Education" },
    { id: "RH1003", sender: "Michael Brown", amount: "$450", date: "2024-02-10", status: "Received", category: "Housing" },
    { id: "RH1004", sender: "Sophia Wilson", amount: "$900", date: "2024-01-29", status: "Received", category: "Business" },
    { id: "RH1005", sender: "Lucas Miller", amount: "$500", date: "2024-01-15", status: "Received", category: "Medical" },
    { id: "RH1006", sender: "Olivia Johnson", amount: "$350", date: "2024-01-05", status: "Received", category: "Utilities" },
    { id: "RH1007", sender: "Ethan Martinez", amount: "$700", date: "2023-12-20", status: "Received", category: "Education" },
    { id: "RH1008", sender: "Ava Lee", amount: "$550", date: "2023-12-10", status: "Received", category: "Housing" },
  ];

  const pendingHelp = [
    { id: "RH1009", sender: "James Thompson", amount: "$750", date: "2024-04-08", status: "Processing", category: "Medical" },
    { id: "RH1010", sender: "Isabella Garcia", amount: "$420", date: "2024-04-05", status: "Processing", category: "Education" },
  ];

  // Monthly summary data
  const monthlySummary = [
    { month: "April 2024", amount: "$1,170", count: 2 },
    { month: "March 2024", amount: "$650", count: 1 },
    { month: "February 2024", amount: "$1,250", count: 2 },
    { month: "January 2024", amount: "$1,750", count: 3 },
    { month: "December 2023", amount: "$1,250", count: 2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Receive Help History</h1>
          <p className="text-muted-foreground">Record of all help received</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="btn-primary" size="sm">
            <ArrowDown className="mr-2 h-4 w-4" />
            Request Help
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Total Help Received</CardTitle>
            <CardDescription>Lifetime received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$8,570</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>This Month</CardTitle>
            <CardDescription>April 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$1,170</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>People Who Helped</CardTitle>
            <CardDescription>Unique senders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">10</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Pending Help</CardTitle>
            <CardDescription>Being processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$1,170</div>
            <p className="text-xs text-muted-foreground mt-1">2 pending transactions</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>Help received by month</CardDescription>
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
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Help by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                  <span className="text-sm">Medical</span>
                </div>
                <span className="font-medium">$1,900 (28%)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                  <span className="text-sm">Education</span>
                </div>
                <span className="font-medium">$1,920 (29%)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                  <span className="text-sm">Housing</span>
                </div>
                <span className="font-medium">$1,000 (15%)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2" />
                  <span className="text-sm">Business</span>
                </div>
                <span className="font-medium">$900 (13%)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                  <span className="text-sm">Utilities</span>
                </div>
                <span className="font-medium">$350 (5%)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2" />
                  <span className="text-sm">Other</span>
                </div>
                <span className="font-medium">$600 (9%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2 flex justify-between flex-col sm:flex-row items-start sm:items-center">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>All help received</CardDescription>
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
              <TabsTrigger value="received">Received</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Sender</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {[...pendingHelp, ...completedHelp].map((help) => (
                        <tr
                          key={help.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{help.id}</td>
                          <td className="p-4 align-middle">{help.sender}</td>
                          <td className="p-4 align-middle">{help.amount}</td>
                          <td className="p-4 align-middle">{help.date}</td>
                          <td className="p-4 align-middle">{help.category}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              help.status === "Received"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {help.status === "Processing" && <Clock className="mr-1 h-3 w-3" />}
                              {help.status}
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
                  Showing <strong>10</strong> of <strong>10</strong> transactions
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

            <TabsContent value="received">
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Sender</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {completedHelp.map((help) => (
                        <tr
                          key={help.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{help.id}</td>
                          <td className="p-4 align-middle">{help.sender}</td>
                          <td className="p-4 align-middle">{help.amount}</td>
                          <td className="p-4 align-middle">{help.date}</td>
                          <td className="p-4 align-middle">{help.category}</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                              {help.status}
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

            <TabsContent value="processing">
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Sender</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {pendingHelp.map((help) => (
                        <tr
                          key={help.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{help.id}</td>
                          <td className="p-4 align-middle">{help.sender}</td>
                          <td className="p-4 align-middle">{help.amount}</td>
                          <td className="p-4 align-middle">{help.date}</td>
                          <td className="p-4 align-middle">{help.category}</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800">
                              <Clock className="mr-1 h-3 w-3" />
                              {help.status}
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
