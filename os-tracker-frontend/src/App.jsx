import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Components
import Icons from './components/Icons';
import GlobalSearchModal from './components/GlobalSearchModal';
import SidebarMenu from './components/SidebarMenu';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import UserResult from './pages/UserResult';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();

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

    const savedFavs = localStorage.getItem('favorites');
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) { }
    }
  }, []);

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

  const toggleFavorite = (userObj) => {
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
  };

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.setItem('recentSearches', JSON.stringify([]));
  };

  return (
    <>
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

export default App;