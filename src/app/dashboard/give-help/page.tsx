import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, HelpCircle, Info } from "lucide-react";
import Link from "next/link";

export default function GiveHelpPage() {
  // Mock data for available help requests
  const helpRequests = [
    { id: "REQ001", name: "Sarah Williams", amount: "$500", reason: "Medical Expenses", date: "2024-04-08", urgency: "High" },
    { id: "REQ002", name: "Michael Brown", amount: "$350", reason: "Education Fees", date: "2024-04-07", urgency: "Medium" },
    { id: "REQ003", name: "Emma Davis", amount: "$200", reason: "Utility Bills", date: "2024-04-06", urgency: "Medium" },
    { id: "REQ004", name: "John Smith", amount: "$750", reason: "Business Support", date: "2024-04-05", urgency: "Low" },
    { id: "REQ005", name: "Lisa Johnson", amount: "$300", reason: "Housing Assistance", date: "2024-04-04", urgency: "High" },
  ];

  return (
    <div className="space-y-6">
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Available Balance</CardTitle>
            <CardDescription>Your current balance available for giving help</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold">$2,500</p>
            <p className="text-sm text-muted-foreground mt-1">Last updated: Today, 10:45 AM</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Add Funds</Button>
            <Button className="btn-primary">Give Help</Button>
          </CardFooter>
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
                <span className="font-medium">$12,345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">This Month:</span>
                <span className="font-medium">$1,500</span>
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

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Quick Help</CardTitle>
            <CardDescription>Help someone directly</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-3">
              <div>
                <label className="text-sm font-medium">Recipient ID</label>
                <input
                  type="text"
                  placeholder="Enter recipient ID"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Amount ($)</label>
                <input
                  type="number"
                  min="10"
                  placeholder="Enter amount"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Message (Optional)</label>
                <textarea
                  placeholder="Write a message"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                ></textarea>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full btn-primary">Send Help</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start">
        <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
        <div>
          <h3 className="font-medium">How Giving Help Works</h3>
          <p className="text-sm text-muted-foreground mt-1">
            When you give help, the funds are transferred to the recipient's account after a review process.
            You can track all your help transactions in your history.
            A small service fee of 2% is applied to each help transaction.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Help Requests</CardTitle>
          <CardDescription>People currently seeking help</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Reason</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Urgency</th>
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
                      <td className="p-4 align-middle">{request.name}</td>
                      <td className="p-4 align-middle">{request.amount}</td>
                      <td className="p-4 align-middle">{request.reason}</td>
                      <td className="p-4 align-middle">{request.date}</td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          request.urgency === "High"
                            ? "bg-red-100 text-red-800"
                            : request.urgency === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                          {request.urgency}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <Button variant="outline" size="sm">
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

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about giving help</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
              How much can I give?
            </h3>
            <p className="text-sm text-muted-foreground pl-6">
              You can give any amount starting from $10 up to your available balance. For amounts over $1,000, additional verification may be required.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
              Is my information secure?
            </h3>
            <p className="text-sm text-muted-foreground pl-6">
              All your personal and payment information is encrypted and securely stored. We never share your details with recipients or third parties.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
              Can I get a refund?
            </h3>
            <p className="text-sm text-muted-foreground pl-6">
              Once help is given and accepted by the recipient, it cannot be refunded. Please ensure you're giving help to the correct recipient.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium flex items-center">
              <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
              How are recipients verified?
            </h3>
            <p className="text-sm text-muted-foreground pl-6">
              All recipients undergo a verification process to ensure legitimacy. This includes identity verification and review of help requests.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
