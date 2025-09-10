import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  // IdCard,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Footer } from "@/sections";
import useAuthGuard from "@/hooks/useAuthGuard";
import { AUTH_TOKEN_KEY } from "@/lib/api";

// interface DashboardLayoutProps {
//   children: ReactNode;
// }

const navigation = [
  { name: "dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profile Students", href: "profile-students", icon: Users },
  { name: "Add Material", href: "add-material", icon: BookOpen },
  // { name: "Generate ID", href: "generate-id", icon: IdCard },
];

export default function DashboardLayout() {
  useAuthGuard();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">Tech Academy</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item, i) => {
            const adjustedHref = i === 0 ? "/admin" : `/admin/${item.href}`;
            const isActive = location.pathname === adjustedHref;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md font-satoshi text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between bg-card border-b border-border px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4 ml-auto">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN_KEY);
                window.location.href = "/login";
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 font-satoshi">{<Outlet />}</main>
        <Footer />
      </div>
    </div>
  );
}
