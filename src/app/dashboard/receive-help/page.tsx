import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, HelpCircle, Info, Clock } from "lucide-react";
import Link from "next/link";

export default function ReceiveHelpPage() {
  // Mock data for help requests and active help
  const helpRequests = [
    { id: "REQ101", amount: "$500", reason: "Education Support", date: "2024-04-05", status: "Pending" },
    { id: "REQ098", amount: "$350", reason: "Medical Expenses", date: "2024-04-01", status: "Approved" },
    { id: "REQ087", amount: "$200", reason: "Housing Assistance", date: "2024-03-28", status: "Fulfilled" },
  ];

  const activeHelp = [
    { id: "AH001", name: "Alex Thompson", amount: "$250", date: "2024-04-07", status: "Processing" },
    { id: "AH002", name: "Maria Garcia", amount: "$500", date: "2024-04-06", status: "Completed" },
  ];

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
            When you request help, your request is reviewed and then made available to potential givers.
            Once approved, your request will be visible to the community.
            Help received will be transferred to your account after verification.
          </p>
        </div>
      </div>

      <Tabs defaultValue="new-request" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new-request">New Request</TabsTrigger>
          <TabsTrigger value="your-requests">Your Requests</TabsTrigger>
          <TabsTrigger value="active-help">Active Help</TabsTrigger>
        </TabsList>

        <TabsContent value="new-request" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request Help</CardTitle>
              <CardDescription>Fill out the form to request help from the community</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Amount Needed ($)</label>
                    <input
                      type="number"
                      min="10"
                      placeholder="Enter amount"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum $10, maximum $1,500 per request
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                    >
                      <option value="">Select a category</option>
                      <option value="medical">Medical Expenses</option>
                      <option value="education">Education Support</option>
                      <option value="housing">Housing Assistance</option>
                      <option value="business">Business Support</option>
                      <option value="utilities">Utility Bills</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Reason for Request</label>
                  <textarea
                    placeholder="Explain why you need help"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                  ></textarea>
                  <p className="text-xs text-muted-foreground mt-1">
                    Be specific about your needs to increase chances of receiving help
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Urgency Level</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="urgency" value="low" className="h-4 w-4" />
                      <span className="text-sm">Low</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="urgency" value="medium" className="h-4 w-4" />
                      <span className="text-sm">Medium</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="urgency" value="high" className="h-4 w-4" />
                      <span className="text-sm">High</span>
                    </label>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> All help requests are reviewed by our team. Providing accurate information increases your chances of approval. Misuse of the platform may result in account suspension.
                  </p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button className="btn-primary">Submit Request</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="your-requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Help Requests</CardTitle>
              <CardDescription>Track your submitted help requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Reason</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {helpRequests.map((request) => (
                        <tr
                          key={request.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{request.id}</td>
                          <td className="p-4 align-middle">{request.amount}</td>
                          <td className="p-4 align-middle">{request.reason}</td>
                          <td className="p-4 align-middle">{request.date}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              request.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : request.status === "Approved"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}>
                              {request.status}
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active-help" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Help</CardTitle>
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
                    <tbody className="[&_tr:last-child]:border-0">
                      {activeHelp.map((help) => (
                        <tr
                          key={help.id}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">{help.id}</td>
                          <td className="p-4 align-middle">{help.name}</td>
                          <td className="p-4 align-middle">{help.amount}</td>
                          <td className="p-4 align-middle">{help.date}</td>
                          <td className="p-4 align-middle">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              help.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}>
                              <Clock className="mr-1 h-3 w-3" />
                              {help.status}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="outline" size="sm">
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
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about receiving help</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
              How much help can I request?
            </h3>
            <p className="text-sm text-muted-foreground pl-6">
              You can request up to $1,500 per month. Individual requests can be for any amount between $10 and $1,500.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
              How long does approval take?
            </h3>
            <p className="text-sm text-muted-foreground pl-6">
              Most requests are reviewed within 24-48 hours. Urgent requests may be expedited.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
              Is there a fee for receiving help?
            </h3>
            <p className="text-sm text-muted-foreground pl-6">
              No, there are no fees for receiving help. However, there may be a small processing fee for withdrawals depending on your withdrawal method.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
              What if my request is not fulfilled?
            </h3>
            <p className="text-sm text-muted-foreground pl-6">
              If your request is not fulfilled within 30 days, you can update it or create a new request. We cannot guarantee that all requests will be fulfilled.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
