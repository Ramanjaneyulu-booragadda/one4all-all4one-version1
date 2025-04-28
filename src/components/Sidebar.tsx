import Link from "next/link";
import {
  Home,
  Settings,
  Users,
  CreditCard,
  ArrowUp,
  ArrowDown,
  LogOut,
  FileText,
  Bell,
  Mail,
  Phone,
  User,
} from "lucide-react";

const sidebarLinks = [
  { icon: <Home size={20} />, label: "Dashboard", href: "/dashboard" },
  {
    icon: <ArrowDown size={20} />,
    label: "Total Members",
    href: "/dashboard/total-members",
  },
  {
    icon: <ArrowUp size={20} />,
    label: "Give Help",
    href: "/dashboard/give-help",
  },
  {
    icon: <ArrowDown size={20} />,
    label: "Receive Help",
    href: "/dashboard/receive-help",
  },
  {
    icon: <CreditCard size={20} />,
    label: "Payment History",
    href: "/dashboard/payment-history",
  },
  {
    icon: <ArrowUp size={20} />,
    label: "Give Help History",
    href: "/dashboard/give-help-history",
  },
  {
    icon: <ArrowDown size={20} />,
    label: "Receive Help History",
    href: "/dashboard/receive-help-history",
  },
  {
    icon: <Bell size={20} />,
    label: "Recent Receive Help",
    href: "/dashboard/recent-help",
  },
  {
    icon: <CreditCard size={20} />,
    label: "Withdrawal History",
    href: "/dashboard/withdrawal-history",
  },
  {
    icon: <Mail size={20} />,
    label: "Change Email Address",
    href: "/dashboard/change-email",
  },
  {
    icon: <Settings size={20} />,
    label: "Change Password",
    href: "/dashboard/change-password",
  },
  {
    icon: <Phone size={20} />,
    label: "Change Phone Number",
    href: "/dashboard/change-phone",
  },
  {
    icon: <User size={20} />,
    label: "My Account",
    href: "/dashboard/my-account",
  },
  {
    icon: <FileText size={20} />,
    label: "Terms of Service",
    href: "/dashboard/terms",
  },
  { icon: <LogOut size={20} />, label: "Logout", href: "/logout" },
];

export function Sidebar() {
  return (
    <aside className="bg-indigo-900 dark:bg-gray-800 w-64 flex-shrink-0 h-screen sticky top-0 overflow-y-auto hidden md:block">
      <div className="p-4">
        <Link href="/dashboard" className="flex items-center mb-8">
          <div className="text-xl font-bold text-white">
            <span className="text-yellow-400">One4ALL</span>
            <span className="text-white">All4One</span>
            <span className="text-blue-400">.com</span>
          </div>
        </Link>

        <div className="space-y-1">
          {sidebarLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex items-center gap-3 text-sm text-gray-200 py-2 px-3 rounded-md hover:bg-blue-900 transition"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
