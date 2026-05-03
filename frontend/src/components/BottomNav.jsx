import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../pages/Dashboard.css';

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
        <i className="fas fa-home"></i>
        <span className="nav-label">Home</span>
      </Link>
      <Link to="#" className="nav-item">
        <i className="fas fa-book"></i>
        <span className="nav-label">Passbook</span>
      </Link>
      <Link to="#" className="nav-item">
        <i className="fas fa-users"></i>
        <span className="nav-label">Members</span>
      </Link>
      <Link to="#" className="nav-item">
        <i className="fas fa-user-circle"></i>
        <span className="nav-label">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNav;
