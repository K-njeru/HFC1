import React from 'react';

const Header: React.FC = () => (
 <div className="bg-card backdrop-blur-md rounded-2xl p-8 mb-8 shadow-lg">
  <div className="flex flex-col">
    <h1 className="flex items-center text-gray-900 text-4xl font-bold mb-2">
      <img src="/hfc.png" alt="Banking Analytics Logo" className="w-12 h-auto mr-4" />
      🏦 Banking Analytics Dashboard
    </h1>
    <p className="text-gray-600 text-lg">
      Comprehensive data visualization and analysis platform for banking transactions
    </p>
  </div>
</div>

);

export default Header;