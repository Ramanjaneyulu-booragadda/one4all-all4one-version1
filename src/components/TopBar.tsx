"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // ✅ For memberId & auth control
import { clearTokens } from "@/utils/tokenService"; // ✅ Custom token cleanup// ✅ You should have this already
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu, User, LogOut, UserRound } from "lucide-react";

export function TopBar() {
  const router = useRouter();
  const { logout } = useAuth(); // logout method from AuthContext

  // Handle logout: clear tokens and redirect to login
  const handleLogout = async () => {
    await logout(); // clears tokens and context state
    router.push("/login"); // redirect to login page
  };

  return (
    <header className="bg-gray-200 dark:bg-gray-700 p-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Logo for mobile view */}
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <span className="text-xl font-bold">
            <span className="text-yellow-400">One4All</span>
            <span className="text-black">-</span>
            <span className="text-blue-500">All4One</span>
          </span>
        </div>

        {/* Logo for larger screens */}
        <div className="hidden md:flex items-center">
          <span className="text-xl font-bold">
            <span className="text-yellow-400">One4All</span>
            <span className="text-black">-</span>
            <span className="text-blue-500">All4One</span>
          </span>
        </div>

        {/* Notifications & Avatar */}
        <div className="flex items-center ml-auto mr-16">
          <Button variant="ghost" size="icon" className="mr-2 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <UserRound size={24} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* ✅ Profile - Navigate to account page */}
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/my-account")}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              {/* Optional settings item */}
              {/* <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem> */}

              <DropdownMenuSeparator />

              {/* ✅ Logout */}
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
