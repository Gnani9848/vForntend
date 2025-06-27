import { useState, useEffect } from 'react';
import LandingPage from '../components/LandingPage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import UserDashboard from '../components/UserDashboard';
import AdminDashboard from '../components/AdminDashboard';
import BookingPage from '../components/BookingPage';
import { User, Flight, Booking } from '../types';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [searchResults, setSearchResults] = useState<Flight[]>([]);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData && userData !== 'undefined') {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setCurrentPage(parsedUser.role === 'ADMIN' ? 'admin-dashboard' : 'user-dashboard');
      } catch (e) {
        // If parsing fails, clear invalid data
        localStorage.removeItem('user');
        setUser(null);
        setCurrentPage('landing');
      }
    }
  }, []);

  const handleLogin = (userData: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setCurrentPage(userData.role === 'ADMIN' ? 'admin-dashboard' : 'user-dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('landing');
  };

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentPage('booking');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} onLogin={handleLogin} />;
      case 'register':
        return <RegisterPage onNavigate={setCurrentPage} />;
      case 'user-dashboard':
        return (
          <UserDashboard 
            user={user} 
            onLogout={handleLogout}
            onFlightSelect={handleFlightSelect}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        );
      case 'admin-dashboard':
        return <AdminDashboard user={user} onLogout={handleLogout} onNavigate={setCurrentPage} />;
      case 'booking':
        return (
          <BookingPage 
            flight={selectedFlight} 
            user={user} 
            onNavigate={setCurrentPage}
          />
        );
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {renderCurrentPage()}
    </div>
  );
};

export default Index;
