import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Shield, AlertTriangle, Info } from "lucide-react";

export default function ChangePasswordPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Change Password</h1>
          <p className="text-muted-foreground">Update your account password</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="mr-2 h-5 w-5 text-blue-500" />
            Password Update
          </CardTitle>
          <CardDescription>
            Strong passwords help protect your account from unauthorized access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="bg-blue-50 p-3 rounded-md flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Password requirements:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>At least 8 characters long</li>
                <li>Include at least one uppercase letter</li>
                <li>Include at least one number</li>
                <li>Include at least one special character</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Important:</p>
              <p>After changing your password, you will be logged out and need to log in again with your new password. All other active sessions will also be terminated.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="btn-primary">Update Password</Button>
        </CardFooter>
      </Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Password Change History</CardTitle>
          <CardDescription>Record of previous password changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Time</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">IP Address</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Device</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">2023-11-15</td>
                    <td className="p-4 align-middle">14:32:12</td>
                    <td className="p-4 align-middle">192.168.1.102</td>
                    <td className="p-4 align-middle">Chrome / Windows</td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">2023-05-22</td>
                    <td className="p-4 align-middle">09:18:45</td>
                    <td className="p-4 align-middle">192.168.1.105</td>
                    <td className="p-4 align-middle">Safari / Mac</td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">2022-12-10</td>
                    <td className="p-4 align-middle">16:55:30</td>
                    <td className="p-4 align-middle">192.168.1.110</td>
                    <td className="p-4 align-middle">Firefox / Windows</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>Additional security options for your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by requiring a verification code in addition to your password.
                </p>
              </div>
            </div>
            <Button variant="outline">Enable</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Login Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications when your account is accessed from a new device or location.
                </p>
              </div>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
