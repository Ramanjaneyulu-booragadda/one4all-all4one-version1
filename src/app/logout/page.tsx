"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout(); // Await logout to ensure state is cleared
    router.push("/login");
  };

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
        
        <CardFooter className="flex justify-between">
          <Link href="/dashboard">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
