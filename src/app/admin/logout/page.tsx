import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function LogoutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
              <LogOut className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Confirm Logout</CardTitle>
          <CardDescription>
            Are you sure you want to log out of your account?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p>You will be signed out from all your active sessions on this device. Any unsaved changes will be lost.</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Active Sessions</h3>
            <div className="rounded-md border">
              <div className="p-3 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Current Device</p>
                    <p className="text-xs text-muted-foreground">Chrome / Windows</p>
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Mobile Device</p>
                    <p className="text-xs text-muted-foreground">Safari / iOS</p>
                  </div>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/dashboard">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Link href="/">
            <Button className="bg-red-600 text-white hover:bg-red-700">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
