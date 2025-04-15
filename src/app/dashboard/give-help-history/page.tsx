import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, Calendar, Clock, Download, Filter, Search } from "lucide-react";

export default function GiveHelpHistoryPage() {
  // Mock data for completed and pending help
  const completedHelp = [
    { id: "GH1001", recipient: "Sarah Williams", amount: "$500", date: "2024-03-15", status: "Completed", category: "Medical" },
    { id: "GH1002", recipient: "David Brown", amount: "$750", date: "2024-02-28", status: "Completed", category: "Education" },
    { id: "GH1003", recipient: "Emily Taylor", amount: "$300", date: "2024-02-15", status: "Completed", category: "Housing" },
    { id: "GH1004", recipient: "James Wilson", amount: "$1,200", date: "2024-02-01", status: "Completed", category: "Business" },
    { id: "GH1005", recipient: "Laura Miller", amount: "$450", date: "2024-01-22", status: "Completed", category: "Medical" },
    { id: "GH1006", recipient: "Michael Davis", amount: "$600", date: "2024-01-10", status: "Completed", category: "Utilities" },
    { id: "GH1007", recipient: "Jessica Martinez", amount: "$900", date: "2023-12-28", status: "Completed", category: "Education" },
    { id: "GH1008", recipient: "Christopher Lee", amount: "$350", date: "2023-12-15", status: "Completed", category: "Housing" },
  ];

  const pendingHelp = [
    { id: "GH1009", recipient: "Amanda Johnson", amount: "$700", date: "2024-04-05", status: "Pending", category: "Medical" },
    { id: "GH1010", recipient: "Robert Garcia", amount: "$400", date: "2024-04-03", status: "Pending", category: "Education" },
  ];

  // Monthly summary data
  const monthlySummary = [
    { month: "April 2024", amount: "$1,100", count: 2 },
    { month: "March 2024", amount: "$500", count: 1 },
    { month: "February 2024", amount: "$2,250", count: 3 },
    { month: "January 2024", amount: "$1,050", count: 2 },
    { month: "December 2023", amount: "$1,250", count: 2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Give Help History</h1>
          <p className="text-muted-foreground">Record of all your help contributions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="btn-primary" size="sm">
            <ArrowUp className="mr-2 h-4 w-4" />
            Give Help
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Total Help Given</CardTitle>
            <CardDescription>Lifetime contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$12,345</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>This Month</CardTitle>
            <CardDescription>April 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$1,100</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>People Helped</CardTitle>
            <CardDescription>Total recipients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">10</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Pending Help</CardTitle>
            <CardDescription>Awaiting processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$1,100</div>
            <p className="text-xs text-muted-foreground mt-1">2 pending transactions</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>Help given by month</CardDescription>
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
                    {monthlySummary.map((item, index) => (
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
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm">Medical</span>
                </div>
                <span className="font-medium">$1,650 (25%)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Education</span>
                </div>
                <span className="font-medium">$2,050 (31%)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Housing</span>
                </div>
                <span className="font-medium">$650 (10%)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm">Business</span>
                </div>
                <span className="font-medium">$1,200 (18%)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">Utilities</span>
                </div>
                <span className="font-medium">$600 (9%)</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                  <span className="text-sm">Other</span>
                </div>
                <span className="font-medium">$450 (7%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2 flex justify-between flex-col sm:flex-row items-start sm:items-center">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>All your help transactions</CardDescription>
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
                        <th className="h-12 px-4 text-left align-middle font-medium">Recipient</th>
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
                          <td className="p-4 align-middle">{help.recipient}</td>
                          <td className="p-4 align-middle">{help.amount}</td>
                          <td className="p-4 align-middle">{help.date}</td>
                          <td className="p-4 align-middle">{help.category}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              help.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {help.status === "Pending" && <Clock className="mr-1 h-3 w-3" />}
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

            <TabsContent value="completed">
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Recipient</th>
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
                          <td className="p-4 align-middle">{help.recipient}</td>
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

            <TabsContent value="pending">
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Recipient</th>
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
                          <td className="p-4 align-middle">{help.recipient}</td>
                          <td className="p-4 align-middle">{help.amount}</td>
                          <td className="p-4 align-middle">{help.date}</td>
                          <td className="p-4 align-middle">{help.category}</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
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
