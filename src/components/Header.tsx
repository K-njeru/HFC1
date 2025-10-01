import React from "react";
import { Sun, Moon } from "lucide-react"; // Lucide React icons

const Header: React.FC = () => {
  // Mock state for theme toggle (replace with actual theme logic)
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add logic to toggle dark/light mode (e.g., updating a theme context or class on the root element)
  };

  return (
    <header
      className={`${
        isDarkMode ? "bg-gray-900" : "bg-white"
      } backdrop-blur-md rounded-2xl p-6 mb-8 shadow-xl sticky top-0 z-10 transition-colors duration-300`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            src="/hfc.png"
            alt="Banking Analytics Logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              HFC Bank
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Real-time insights for financial success
            </p>
          </div>
        </div>

        {/* Middle: Search Bar */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <input
            type="text"
            placeholder="Search transactions, customers..."
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Right: Profile and Theme Toggle */}
        <div className="flex items-center space-x-6">
          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <img
              src="https://i.pravatar.cc/40?img=12"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-blue-500 shadow"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Alex Johnson
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Relationship Manager
              </p>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "bg-gray-800 text-yellow-400"
                : "bg-gray-200 text-gray-800"
            } hover:scale-105 transition-transform duration-200`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
