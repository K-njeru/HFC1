import React from 'react';

const Header: React.FC = () => (
  <div className="header">
    {/* <img src="/hfctop.png" alt="Banking Analytics Logo" className="header-logo" /> */}
    <div className="header-text">
      <h1><img src="/hfc.png" alt="Banking Analytics Logo" className="header-logo" />🏦 Banking Analytics Dashboard</h1>
      <p>Comprehensive data visualization and analysis platform for banking transactions</p>
    </div>
  </div>
);

export default Header;