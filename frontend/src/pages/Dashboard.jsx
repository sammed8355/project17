import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Layout>
      <div className="dashboard-wrapper">
        {/* Greeting */}
        <div className="greeting-section">
          <h2 className="greeting">{t('welcomeBack')}, {user?.name || "Sunita Patil"} 👋</h2>
        </div>

        {/* Top 4 Stats Grid */}
        <div className="detailed-stats-grid">
          <div className="detailed-stat-card">
            <p className="stat-label">{t('totalSavings')}</p>
            <h3 className="stat-amount">₹15,500</h3>
            <p className="stat-desc">{t('allTime')}</p>
          </div>
          <div className="detailed-stat-card">
            <p className="stat-label">{t('thisMonthSavings')}</p>
            <h3 className="stat-amount">₹500</h3>
            <p className="stat-desc">April 2025</p>
          </div>
          <div className="detailed-stat-card">
            <p className="stat-label">{t('totalLoans')}</p>
            <h3 className="stat-amount">₹10,000</h3>
            <p className="stat-desc">1 {t('activeLoan')}</p>
          </div>
          <div className="detailed-stat-card">
            <p className="stat-label">{t('pendingPayments')}</p>
            <h3 className="stat-amount">₹500</h3>
            <p className="stat-desc warning">1 {t('pending')}</p>
          </div>
        </div>

        {/* Middle Section: Passbook Summary & Recent Transactions */}
        <div className="dashboard-middle">
          
          {/* Passbook Summary */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">{t('passbookSummary')}</h3>
              <a href="#" className="card-link">{t('viewFullPassbook')}</a>
            </div>
            
            <div className="passbook-summary-grid">
              <div>
                <div className="summary-item">
                  <p className="summary-label">{t('totalTransactions')}</p>
                  <p className="summary-value">28</p>
                </div>
                <div className="summary-item">
                  <p className="summary-label">{t('totalWithdrawals')}</p>
                  <p className="summary-value danger">₹10,000</p>
                </div>
              </div>
              <div>
                <div className="summary-item">
                  <p className="summary-label">{t('totalDeposits')}</p>
                  <p className="summary-value success">₹15,500</p>
                </div>
                <div className="summary-item">
                  <p className="summary-label">{t('totalBalance')}</p>
                  <p className="summary-value success">₹5,500</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">{t('recentTransactions')}</h3>
              <a href="#" className="card-link">{t('viewAll')}</a>
            </div>
            
            <div className="transaction-list">
              <div className="transaction-item">
                <div className="trans-left">
                  <div className="trans-icon"><i className="fas fa-arrow-down"></i></div>
                  <div className="trans-info">
                    <h4>{t('monthlySavings')}</h4>
                    <p>27 Apr 2025</p>
                  </div>
                </div>
                <div className="trans-amount credit">+₹500</div>
              </div>

              <div className="transaction-item">
                <div className="trans-left">
                  <div className="trans-icon expense"><i className="fas fa-arrow-up"></i></div>
                  <div className="trans-info">
                    <h4>{t('loanPayment')}</h4>
                    <p>26 Apr 2025</p>
                  </div>
                </div>
                <div className="trans-amount debit">-₹1,000</div>
              </div>

              <div className="transaction-item">
                <div className="trans-left">
                  <div className="trans-icon"><i className="fas fa-arrow-down"></i></div>
                  <div className="trans-info">
                    <h4>{t('monthlySavings')}</h4>
                    <p>20 Apr 2025</p>
                  </div>
                </div>
                <div className="trans-amount credit">+₹500</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Table & Meetings/Loans */}
        <div className="dashboard-bottom">
          
          {/* Table */}
          <div className="dashboard-card" style={{ overflowX: 'auto' }}>
            <div className="card-header">
              <h3 className="card-title">{t('yourPassbookTitle')}</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>{t('date')}</th>
                  <th>{t('particulars')}</th>
                  <th>{t('type')}</th>
                  <th>{t('amount')}</th>
                  <th>{t('balance')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>27 Apr 2025</td>
                  <td>{t('monthlySavings')} (Apr 2025)</td>
                  <td>{t('credit')}</td>
                  <td className="success">+₹500</td>
                  <td>₹5,500</td>
                </tr>
                <tr>
                  <td>26 Apr 2025</td>
                  <td>{t('loanPayment')}</td>
                  <td>{t('debit')}</td>
                  <td className="danger">-₹1,000</td>
                  <td>₹5,000</td>
                </tr>
                <tr>
                  <td>20 Apr 2025</td>
                  <td>{t('monthlySavings')} (Mar 2025)</td>
                  <td>{t('credit')}</td>
                  <td className="success">+₹500</td>
                  <td>₹6,000</td>
                </tr>
                <tr>
                  <td>15 Apr 2025</td>
                  <td>{t('loanDisbursed')} (LN002)</td>
                  <td>{t('credit')}</td>
                  <td className="success">+₹10,000</td>
                  <td>₹5,500</td>
                </tr>
                <tr>
                  <td>10 Apr 2025</td>
                  <td>{t('monthlySavings')} (Feb 2025)</td>
                  <td>{t('credit')}</td>
                  <td className="success">+₹500</td>
                  <td>-₹4,500</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Side Cards: Meetings & Active Loan */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">{t('upcomingMeeting')}</h3>
              </div>
              <div className="meeting-card">
                <h4><i className="far fa-calendar-alt text-green-700"></i> {t('monthlyMeeting')}</h4>
                <p>30 Apr 2025, 11:00 AM</p>
                <p><i className="fas fa-map-marker-alt"></i> {t('puneCenter')}</p>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h3 className="card-title">{t('myActiveLoan')}</h3>
                <span className="status-badge">{t('active')}</span>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#64748b' }}>{t('loanId')}: LN002</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>{t('loanAmount')}</p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>₹10,000</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>{t('pendingAmount')}</p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>₹5,000</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;
