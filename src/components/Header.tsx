"use client";

import {
  Bell,
  CreditCard,
  Home,
  LogOut,
  Menu,
  MessageSquareDot,
  Settings,
  Users,
  CircleUser,
} from "lucide-react";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { getInitials } from "../lib/utils";

const demoUsers = [
  {
    name: "Alex Johnson",
    email: "alex.johnson@hfcbank.com",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Maria Lopez",
    email: "maria.lopez@hfcbank.com",
    avatar: "https://i.pravatar.cc/150?img=45",
  },
];

export default function HeaderWithSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(demoUsers[0]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 border-r border-border bg-card flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          <span className="text-lg font-semibold">
            {sidebarOpen ? "🏦 HFC Bank" : "🏦"}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-1 p-2 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" /> {sidebarOpen && "Dashboard"}
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" /> {sidebarOpen && "Customers"}
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />{" "}
            {sidebarOpen && "Transactions"}
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" /> {sidebarOpen && "Settings"}
          </Button>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3 shadow-sm">
          <h1 className="text-xl font-semibold">Banking Analytics Dashboard</h1>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-accent"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <MessageSquareDot className="mr-2 h-4 w-4" />
                  New customer registered
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Large transaction flagged
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="rounded-lg">
                      {getInitials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{currentUser.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="p-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback className="rounded-lg">
                        {getInitials(currentUser.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {demoUsers.map((user, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      onClick={() => setCurrentUser(user)}
                    >
                      <CircleUser className="mr-2 h-4 w-4" />
                      Switch to {user.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <CircleUser />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquareDot />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-background">
          <p className="text-muted-foreground">
            Welcome, {currentUser.name}. This is your banking dashboard
            workspace.
          </p>
        </main>
      </div>
    </div>
  );
}
