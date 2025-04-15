import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Shield, AlertTriangle } from "lucide-react";

export default function ChangeEmailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Change Email Address</h1>
          <p className="text-muted-foreground">Update your account email address</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5 text-blue-500" />
            Email Address Update
          </CardTitle>
          <CardDescription>
            Your email address is used for account notifications and password resets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Email Address</label>
            <div className="flex items-center">
              <input
                type="email"
                value="john.doe@example.com"
                disabled
                className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm"
              />
              <div className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs flex items-center">
                <Shield className="mr-1 h-3 w-3" /> Verified
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">New Email Address</label>
            <input
              type="email"
              placeholder="Enter new email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm New Email Address</label>
            <input
              type="email"
              placeholder="Confirm new email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <input
              type="password"
              placeholder="Enter your current password"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <p className="text-xs text-muted-foreground">
              For security reasons, please enter your current password to confirm this change
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Important:</p>
              <p>Changing your email address will require verification of the new email. You will receive a verification link at your new email address.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="btn-primary">Update Email Address</Button>
        </CardFooter>
      </Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Email Change History</CardTitle>
          <CardDescription>Record of previous email address changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Previous Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">New Email</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">2023-09-15</td>
                    <td className="p-4 align-middle">old.email@example.com</td>
                    <td className="p-4 align-middle">john.doe@example.com</td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">2022-05-10</td>
                    <td className="p-4 align-middle">initial.email@example.com</td>
                    <td className="p-4 align-middle">old.email@example.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
