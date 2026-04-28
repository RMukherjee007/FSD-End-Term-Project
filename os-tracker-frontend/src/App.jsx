import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Context
import { AuthProvider, AuthContext } from './context/AuthContext';

// Components
import Icons from './components/Icons';
import GlobalSearchModal from './components/GlobalSearchModal';
import SidebarMenu from './components/SidebarMenu';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AnimatedBackground from './components/AnimatedBackground';

// Pages
import Home from './pages/Home';
import UserResult from './pages/UserResult';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import Login from './pages/Login';
import Register from './pages/Register';

function AppContent() {
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const { user, setUser, getBaseUrl } = useContext(AuthContext);

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('app-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        const parsed = JSON.parse(savedSearches);
        const valid = parsed.filter(item => typeof item === 'object' && item.login);
        setRecentSearches(valid);
      } catch (e) { }
    }
  }, []);

  useEffect(() => {
    if (user && user.favorites) {
      setFavorites(user.favorites);
    } else {
      const savedFavs = localStorage.getItem('favorites');
      if (savedFavs) {
        try { setFavorites(JSON.parse(savedFavs)); } catch (e) { }
      } else {
        setFavorites([]); // clear when logging out if no local state
      }
    }
  }, [user]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const saveRecentSearch = (userObj) => {
    setRecentSearches(prev => {
      let updated = [userObj, ...prev.filter(s => s.login.toLowerCase() !== userObj.login.toLowerCase())];
      if (updated.length > 10) updated = updated.slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = async (userObj) => {
    if (user) {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.post(`${getBaseUrl()}/api/user/favorites`, userObj, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(res.data);
        setUser({ ...user, favorites: res.data });
      } catch (err) {
        console.error('Error toggling favorite:', err);
      }
    } else {
      setFavorites(prev => {
        const exists = prev.find(f => f.login === userObj.login);
        let updated;
        if (exists) {
          updated = prev.filter(f => f.login !== userObj.login);
        } else {
          updated = [userObj, ...prev];
        }
        localStorage.setItem('favorites', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.setItem('recentSearches', JSON.stringify([]));
  };

  return (
    <>
      <AnimatedBackground />
      <ScrollToTop />
      {/* Global Navbar */}
      <nav className="global-navbar">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <Icons.Code /> OS Tracker
          </Link>
          <div className="nav-actions">
            <button className="hamburger-btn" onClick={() => setIsSearchModalOpen(true)} title="Global Search">
              <Icons.Search />
            </button>
            <a href="https://github.com/RMukherjee007/FSD-End-Term-Project" target="_blank" rel="noopener noreferrer" className="hamburger-btn" title="Source Code">
              <Icons.Github />
            </a>
            <button className="hamburger-btn" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'light' ? <Icons.Moon /> : <Icons.Sun />}
            </button>
            <button className="hamburger-btn" onClick={() => setIsMenuOpen(true)}>
              <Icons.Menu />
            </button>
          </div>
        </div>
      </nav>

      <GlobalSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />

      {/* Sidebar Overlay Menu */}
      <SidebarMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        recentSearches={recentSearches}
        favorites={favorites}
        clearHistory={clearHistory}
      />

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home recentSearches={recentSearches} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user/:username"
            element={
              <UserResult
                saveRecentSearch={saveRecentSearch}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            }
          />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;