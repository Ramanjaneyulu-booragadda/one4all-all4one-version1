import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, Bell, Calendar, Clock, Filter, MessageCircle, Search } from "lucide-react";
import Link from "next/link";

export default function RecentHelpPage() {
  // Mock data for recent help
  const recentHelp = [
    { id: "RR001", sender: "Michael Scott", amount: "$750", date: "2024-04-10", time: "14:32:45", status: "Pending", message: "Hope this helps with your medical bills." },
    { id: "RR002", sender: "Jim Halpert", amount: "$500", date: "2024-04-08", time: "09:15:22", status: "Received", message: "For your education expenses. Good luck!" },
    { id: "RR003", sender: "Pam Beesly", amount: "$900", date: "2024-04-05", time: "16:45:10", status: "Received", message: "This should cover your housing costs this month." },
    { id: "RR004", sender: "Dwight Schrute", amount: "$600", date: "2024-04-02", time: "11:20:35", status: "Received", message: "For your business venture. Hope it helps!" },
    { id: "RR005", sender: "Angela Martin", amount: "$300", date: "2024-03-30", time: "08:55:18", status: "Received", message: "To help with your utility bills." },
  ];

  // Today's notifications
  const todayNotifications = [
    { id: 1, time: "14:32", message: "Michael Scott sent you $750", type: "help" },
    { id: 2, time: "12:15", message: "Your withdrawal request for $500 is processing", type: "withdrawal" },
    { id: 3, time: "09:30", message: "System maintenance scheduled for tonight", type: "system" },
  ];

  // Earlier notifications
  const earlierNotifications = [
    { id: 4, time: "Yesterday", message: "Jim Halpert sent you $500", type: "help" },
    { id: 5, time: "Yesterday", message: "Your profile was updated successfully", type: "profile" },
    { id: 6, time: "3 days ago", message: "Pam Beesly sent you $900", type: "help" },
    { id: 7, time: "5 days ago", message: "Dwight Schrute sent you $600", type: "help" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recent Receive Help</h1>
          <p className="text-muted-foreground">Most recent help you've received</p>
        </div>
        <div className="flex space-x-2">
          <Button className="btn-primary" size="sm">
            <ArrowDown className="mr-2 h-4 w-4" />
            Request Help
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Help Received</CardTitle>
            <CardDescription>Help received in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Sender</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Date & Time</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Message</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {recentHelp.map((help) => (
                      <tr
                        key={help.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">{help.id}</td>
                        <td className="p-4 align-middle">{help.sender}</td>
                        <td className="p-4 align-middle">{help.amount}</td>
                        <td className="p-4 align-middle">
                          {help.date}<br />
                          <span className="text-xs text-muted-foreground">{help.time}</span>
                        </td>
                        <td className="p-4 align-middle">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            help.status === "Received"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {help.status === "Pending" && <Clock className="mr-1 h-3 w-3" />}
                            {help.status}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <span className="line-clamp-1 max-w-[200px]">{help.message}</span>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing <strong>5</strong> of <strong>5</strong> recent help transactions
              </div>
              <Link href="/dashboard/receive-help-history" className="text-sm text-blue-600 hover:underline">
                View all help history
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Help Notifications</CardTitle>
            <CardDescription>Recent activity and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Today</h3>
                  <div className="space-y-2">
                    {todayNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-100">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === "help"
                            ? "bg-blue-100"
                            : notification.type === "withdrawal"
                            ? "bg-green-100"
                            : "bg-gray-100"
                        }`}>
                          {notification.type === "help" && <ArrowDown className="h-4 w-4 text-blue-600" />}
                          {notification.type === "withdrawal" && <ArrowDown className="h-4 w-4 text-green-600" />}
                          {notification.type === "system" && <Bell className="h-4 w-4 text-gray-600" />}
                          {notification.type === "profile" && <User className="h-4 w-4 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Earlier</h3>
                  <div className="space-y-2">
                    {earlierNotifications.map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-100">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.type === "help"
                            ? "bg-blue-100"
                            : notification.type === "withdrawal"
                            ? "bg-green-100"
                            : notification.type === "profile"
                            ? "bg-purple-100"
                            : "bg-gray-100"
                        }`}>
                          {notification.type === "help" && <ArrowDown className="h-4 w-4 text-blue-600" />}
                          {notification.type === "withdrawal" && <ArrowDown className="h-4 w-4 text-green-600" />}
                          {notification.type === "system" && <Bell className="h-4 w-4 text-gray-600" />}
                          {notification.type === "profile" && <User className="h-4 w-4 text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  View all notifications
                </Button>
              </TabsContent>

              <TabsContent value="unread">
                <div className="py-8 text-center text-muted-foreground">
                  <Bell className="mx-auto h-10 w-10 mb-2 opacity-20" />
                  <p>No unread notifications</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity Summary</CardTitle>
            <CardDescription>Overview of your recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Help Received (30 days):</span>
                <span className="font-medium">$3,050</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Number of Transactions:</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pending Help:</span>
                <span className="font-medium">$750</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Withdrawal Requests:</span>
                <span className="font-medium">$500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Unique Senders:</span>
                <span className="font-medium">5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common actions for received help</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                <ArrowDown className="mr-2 h-4 w-4" />
                Request New Help
              </Button>
              <Button className="w-full" variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                Send Thank You Messages
              </Button>
              <Button className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Help Statement
              </Button>
              <Button className="w-full" variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Configure Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// User component for the notifications
function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
