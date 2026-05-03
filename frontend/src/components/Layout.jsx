import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Layout.css';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const langRef = useRef(null);
  const { t, language, changeLanguage } = useLanguage();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setLangDropdownOpen(false);
  };

  const navLinks = [
    { name: t('dashboard'), path: '/dashboard', icon: 'fas fa-home' },
    { name: t('members'), path: '#', icon: 'fas fa-users' },
    { name: t('myProfile'), path: '#', icon: 'fas fa-user-circle' },
    { name: t('passbook'), path: '#', icon: 'fas fa-book', badge: 'New' },
    { name: t('makePayment'), path: '#', icon: 'fas fa-rupee-sign' },
    { name: t('myLoans'), path: '#', icon: 'fas fa-money-check-alt' },
    { name: t('myMeetings'), path: '#', icon: 'fas fa-calendar-alt' },
    { name: t('myDocuments'), path: '#', icon: 'fas fa-folder-open' },
    { name: t('notifications'), path: '#', icon: 'fas fa-bell', badge: '3' },
    { name: t('myReceipts'), path: '#', icon: 'fas fa-receipt' },
    { name: t('settings'), path: '#', icon: 'fas fa-cog' },
    { name: t('helpSupport'), path: '#', icon: 'fas fa-question-circle' },
  ];

  const currentDate = new Date().toLocaleDateString(
    language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-GB', 
    { day: 'numeric', month: 'short', year: 'numeric', weekday: 'long' }
  );

  return (
    <div className="app-layout">
      {/* Mobile Overlay */}
      <div 
        className={`sidebar-overlay ${mobileOpen ? 'show' : ''}`}
        onClick={() => setMobileOpen(false)}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo"><i className="fas fa-leaf"></i></div>
          <div className="sidebar-title">
            <h2>Mahila Bachat Gat</h2>
            <p>{t('tagline')}</p>
          </div>
        </div>

        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            {user?.profile_photo ? (
              <img src={user.profile_photo} alt="Profile" />
            ) : (
              user?.name ? user.name.charAt(0).toUpperCase() : 'U'
            )}
          </div>
          <div className="sidebar-user-info">
            <h3>{user?.name || "User"}</h3>
            <p>{user?.memberId || "MBG001"}</p>
            <span className="active-badge">{user?.role || "Active Member"}</span>
          </div>
        </div>

        <div className="sidebar-nav">
          {navLinks.map((link, index) => (
            <Link 
              to={link.path} 
              key={index} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <i className={link.icon}></i>
              <span style={{ flex: 1 }}>{link.name}</span>
              {link.badge && (
                <span style={{ background: '#f39c12', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '10px' }}>
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="sidebar-footer">
          <p>{t('quickPay')}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-left" style={{ display: 'flex', alignItems: 'center' }}>
            <i 
              className="fas fa-bars mobile-toggle" 
              onClick={() => setMobileOpen(true)}
            ></i>
            <h1>{t('dashboard')}</h1>
          </div>

          <div className="topbar-right">
            <span className="topbar-date">{currentDate}</span>
            
            {/* Notification Bell */}
            <div className="topbar-notification">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </div>

            {/* Language Switcher */}
            <div className="topbar-profile" ref={langRef} onClick={() => setLangDropdownOpen(!langDropdownOpen)} style={{ marginLeft: '10px' }}>
              <i className="fas fa-globe" style={{ fontSize: '20px', color: '#34495e' }}></i>
              
              {langDropdownOpen && (
                <div className="profile-dropdown" style={{ width: '120px' }}>
                  <div className={`dropdown-item ${language === 'en' ? 'active-lang' : ''}`} onClick={() => handleLanguageChange('en')}>
                    English
                  </div>
                  <div className={`dropdown-item ${language === 'mr' ? 'active-lang' : ''}`} onClick={() => handleLanguageChange('mr')}>
                    मराठी
                  </div>
                  <div className={`dropdown-item ${language === 'hi' ? 'active-lang' : ''}`} onClick={() => handleLanguageChange('hi')}>
                    हिंदी
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile */}
            <div className="topbar-profile" ref={profileRef} onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
              <span className="topbar-profile-name">{user?.name || "User"}</span>
              <div className="topbar-profile-avatar">
                {user?.profile_photo ? (
                  <img src={user.profile_photo} alt="Profile" />
                ) : (
                  user?.name ? user.name.charAt(0).toUpperCase() : 'U'
                )}
              </div>
              <i className="fas fa-chevron-down" style={{ fontSize: '12px', color: '#7f8c8d' }}></i>

              {profileDropdownOpen && (
                <div className="profile-dropdown">
                  <Link to="#" className="dropdown-item">
                    <i className="fas fa-cog"></i> {t('settings')}
                  </Link>
                  <Link to="#" className="dropdown-item">
                    <i className="fas fa-user-edit"></i> {t('editProfile')}
                  </Link>
                  <div className="dropdown-item logout" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> {t('logout')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
