"use client"

import { LayoutDashboard, CreditCard, BarChart3, Users, Settings, ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 bg-sidebar border-r border-sidebar-border shadow-lg hidden md:block transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 bg-sidebar border border-sidebar-border rounded-full p-1 hover:bg-sidebar-accent transition-colors"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4 text-primary" /> : <ChevronLeft className="w-4 h-4 text-primary" />}
      </button>

      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <img src="/hfc.png" alt="HFC Bank Logo" className="w-10 h-10 object-contain flex-shrink-0" />
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">HFC Bank</h2>
              <p className="text-xs text-sidebar-foreground/70">Analytics Dashboard</p>
            </div>
          )}
        </div>
      </div>
      <nav className="p-4 space-y-2">
        <a
          href="#"
          className="flex items-center p-3 text-sidebar-accent-foreground bg-sidebar-accent rounded-lg transition-colors font-medium"
          title="Dashboard"
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0 text-primary" />
          {!isCollapsed && <span className="ml-3">Dashboard</span>}
        </a>
        <a
          href="#"
          className="flex items-center p-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors"
          title="Transactions"
        >
          <CreditCard className="w-5 h-5 flex-shrink-0 text-primary" />
          {!isCollapsed && <span className="ml-3">Transactions</span>}
        </a>
        <a
          href="#"
          className="flex items-center p-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors"
          title="Reports"
        >
          <BarChart3 className="w-5 h-5 flex-shrink-0 text-primary" />
          {!isCollapsed && <span className="ml-3">Reports</span>}
        </a>
        <a
          href="#"
          className="flex items-center p-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors"
          title="Customers"
        >
          <Users className="w-5 h-5 flex-shrink-0 text-primary" />
          {!isCollapsed && <span className="ml-3">Customers</span>}
        </a>
        <a
          href="#"
          className="flex items-center p-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5 flex-shrink-0 text-primary" />
          {!isCollapsed && <span className="ml-3">Settings</span>}
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar
