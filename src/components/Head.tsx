"use client";

import React, { useState } from 'react';
import { Menu, X, UserCircle, Bell, LogOut, Sun, Moon, CreditCard, MessageSquareDot } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

// Demo users
const demoUsers = [
  {
    name: "John Doe",
    email: "john.doe@bankingapp.com",
    avatar: "/avatars/john.jpg",
    role: "Admin",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@bankingapp.com",
    avatar: "/avatars/jane.jpg",
    role: "Manager",
  },
];

// Demo notifications
const demoNotifications = [
  { id: 1, message: "New transaction alert: $5,000 deposit", time: "2h ago" },
  { id: 2, message: "Account balance updated", time: "4h ago" },
];

// Utility to get initials
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(demoUsers[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [unreadNotifications] = useState(demoNotifications.length);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add theme toggle logic (e.g., update context or localStorage)
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserSwitch = (user: typeof demoUsers[0]) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    // Add logout logic (e.g., clear auth, redirect)
    console.log("Logged out");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-card shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900">Banking Dashboard</h2>
          <nav className="mt-6 space-y-2">
            <a
              href="#"
              className="flex items-center p-2 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Transactions
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg"
            >
              <MessageSquareDot className="w-5 h-5 mr-2" />
              Reports
            </a>
            <a
              href="#"
              className="flex items-center p-2 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg"
            >
              <UserCircle className="w-5 h-5 mr-2" />
              Accounts
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header
          className={`bg-card backdrop-blur-md rounded-2xl p-6 mb-8 shadow-xl sticky top-0 z-10 transition-colors duration-300`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Left: Sidebar Toggle, Logo, and Title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:hidden"
                aria-label="Toggle sidebar"
              >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <img
                src="/hfc.png"
                alt="Banking Analytics Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Banking Analytics Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time insights for financial success
                </p>
              </div>
            </div>

            {/* Right: Notifications, Theme Toggle, and User Profile */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="relative p-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    aria-label="Notifications"
                  >
                    <Bell className="w-6 h-6" />
                    {unreadNotifications > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-80 rounded-lg"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {demoNotifications.length > 0 ? (
                    demoNotifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="flex flex-col items-start">
                        <span className="text-sm">{notification.message}</span>
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem>No new notifications</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center space-x-2 p-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    aria-label="User menu"
                  >
                    <Avatar className="h-8 w-8 rounded-lg grayscale">
                      <AvatarImage src={currentUser.avatar || undefined} alt={currentUser.name} />
                      <AvatarFallback className="rounded-lg">
                        {getInitials(currentUser.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:grid text-left text-sm leading-tight">
                      <span className="truncate font-medium text-gray-900">{currentUser.name}</span>
                      <span className="text-muted-foreground truncate text-xs">{currentUser.role}</span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 rounded-lg"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={currentUser.avatar || undefined} alt={currentUser.name} />
                        <AvatarFallback className="rounded-lg">
                          {getInitials(currentUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{currentUser.name}</span>
                        <span className="text-muted-foreground truncate text-xs">{currentUser.email}</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Switch User</DropdownMenuLabel>
                    {demoUsers.map((user) => (
                      <DropdownMenuItem
                        key={user.email}
                        onClick={() => handleUserSwitch(user)}
                        className="cursor-pointer"
                      >
                        <UserCircle className="w-4 h-4 mr-2" />
                        {user.name} ({user.role})
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserCircle className="w-4 h-4 mr-2" />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquareDot className="w-4 h-4 mr-2" />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;