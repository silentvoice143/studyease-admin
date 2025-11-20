import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Home,
  Settings,
  Users,
  FileText,
  BarChart,
  ShoppingCart,
  Package,
  TrendingUp,
  DollarSign,
  CreditCard,
  Bell,
  Wallet,
  Plus,
} from "lucide-react";

export const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart, // ✅ store the component, not the JSX
    children: [
      { id: "activity", label: "Activity", href: "/dashboard/activity" },
      { id: "traffic", label: "Traffic", href: "/dashboard/traffic" },
      { id: "statistic", label: "Statistic", href: "/dashboard/statistic" },
    ],
  },
  {
    id: "streams",
    label: "Streams",
    icon: FileText,
    href: "/streams",
  },
];
