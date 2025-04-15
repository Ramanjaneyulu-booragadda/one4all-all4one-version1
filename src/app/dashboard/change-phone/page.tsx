import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Shield, AlertTriangle } from "lucide-react";

export default function ChangePhonePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Change Phone Number</h1>
          <p className="text-muted-foreground">Update your account phone number</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="mr-2 h-5 w-5 text-blue-500" />
            Phone Number Update
          </CardTitle>
          <CardDescription>
            Your phone number is used for account verifications and security alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Phone Number</label>
            <div className="flex items-center">
              <input
                type="tel"
                value="+1 (555) 123-4567"
                disabled
                className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm"
              />
              <div className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs flex items-center">
                <Shield className="mr-1 h-3 w-3" /> Verified
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Country Code</label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="+1">United States (+1)</option>
              <option value="+44">United Kingdom (+44)</option>
              <option value="+91">India (+91)</option>
              <option value="+61">Australia (+61)</option>
              <option value="+33">France (+33)</option>
              <option value="+49">Germany (+49)</option>
              <option value="+81">Japan (+81)</option>
              <option value="+86">China (+86)</option>
              <option value="+234">Nigeria (+234)</option>
              <option value="+27">South Africa (+27)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">New Phone Number</label>
            <input
              type="tel"
              placeholder="Enter new phone number"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Enter numbers only, without any formatting (e.g., 5551234567)
            </p>
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
              <p>Changing your phone number will require verification via SMS. We will send a verification code to your new phone number.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="btn-primary">Update Phone Number</Button>
        </CardFooter>
      </Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Phone Number Change History</CardTitle>
          <CardDescription>Record of previous phone number changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Previous Number</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">New Number</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">2023-08-18</td>
                    <td className="p-4 align-middle">+1 (555) 987-6543</td>
                    <td className="p-4 align-middle">+1 (555) 123-4567</td>
                  </tr>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">2022-04-12</td>
                    <td className="p-4 align-middle">+1 (555) 321-7654</td>
                    <td className="p-4 align-middle">+1 (555) 987-6543</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Phone-Based Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">SMS Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Receive a verification code via SMS when logging in from a new device or location.
                </p>
              </div>
            </div>
            <Button variant="outline">Enable</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">SMS Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive SMS alerts for important account activities like help transactions and withdrawals.
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
