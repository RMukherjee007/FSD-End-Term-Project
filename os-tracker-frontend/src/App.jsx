import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import './App.css';

// Reusable SVG Icons
const Icons = {
  Search: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Star: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  StarFilled: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  Code: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  ArrowLeft: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>,
  Menu: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  X: () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Trash2: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>,
  Sun: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,
  Moon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
  Share: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>,
  Github: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
};

function Home({ recentSearches }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e, searchUsername = username) => {
    if (e) e.preventDefault();
    if (!searchUsername) return;
    navigate(`/user/${searchUsername}`);
  };

  return (
    <div className="container fade-in">
      <h1>Track your open source footprint.</h1>

      <form onSubmit={handleSearch} className="search-section">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">
          <Icons.Search />
        </button>
      </form>

      {recentSearches && recentSearches.length > 0 && (
        <div className="jump-back-in fade-in">
          <p className="jump-back-title">Jump back in:</p>
          <div className="jump-back-pills">
            {recentSearches.slice(0, 5).map((user, idx) => (
              <div key={idx} className="jump-back-pill" onClick={() => handleSearch(null, user.login)}>
                <img src={user.avatar} alt={user.login} />
                <span>{user.name || user.login}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="landing-content fade-in">
        <h2 className="section-title" style={{ marginTop: '2rem', marginBottom: '2rem', fontSize: '2.5rem' }}>Trending Developers</h2>
        <div className="feature-cards">
          <div className="feature-card card-black" onClick={() => handleSearch(null, 'torvalds')}>
            <h3>Linus Torvalds</h3>
            <p>Explore the creator of Linux and Git.</p>
            <div className="feature-arrow">→</div>
          </div>
          <div className="feature-card card-green" onClick={() => handleSearch(null, 'gaearon')}>
            <h3>Dan Abramov</h3>
            <p>Co-author of Redux and Create React App.</p>
            <div className="feature-arrow">→</div>
          </div>
          <div className="feature-card card-grey" onClick={() => handleSearch(null, 'yyx990803')}>
            <h3>Evan You</h3>
            <p>Creator of Vue.js and Vite.</p>
            <div className="feature-arrow">→</div>
          </div>
        </div>

        <div className="how-it-works">
          <h2 className="section-title" style={{ marginTop: '5rem', marginBottom: '3rem', fontSize: '2.5rem' }}>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Search</h3>
              <p>Enter any valid GitHub username in the large search bar above.</p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Analyze</h3>
              <p>We fetch real-time profile statistics including followers, repos, and gists.</p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3>Track</h3>
              <p>Instantly view their most recently updated repositories and languages.</p>
            </div>
          </div>
        </div>

        <div className="why-os-tracker fade-in">
          <h2 className="section-title" style={{ marginTop: '5rem', marginBottom: '3rem', fontSize: '2.5rem' }}>Why OS Tracker?</h2>
          <div className="steps-grid">
            <div className="step-card feature-highlight">
              <div className="step-icon"><Icons.Code /></div>
              <h3>Real-Time Data</h3>
              <p>Fetches live statistics directly from the GitHub API so you're always up to date.</p>
            </div>
            <div className="step-card feature-highlight">
              <div className="step-icon"><Icons.Sun /></div>
              <h3>Beautifully Themed</h3>
              <p>Meticulously designed with high-contrast Light mode and a sleek, low-strain Dark mode.</p>
            </div>
            <div className="step-card feature-highlight">
              <div className="step-icon"><Icons.Star /></div>
              <h3>Persistent Bookmarks</h3>
              <p>Save your favorite developers directly to your browser's local storage for quick access.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserResult({ saveRecentSearch, toggleFavorite, favorites }) {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async (userToFetch) => {
    setLoading(true);
    setError('');
    setData(null);

    try {
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? `http://localhost:5001/api/github/${userToFetch}`
        : `/api/github/${userToFetch}`;

      const response = await axios.get(apiUrl);
      setData(response.data);
      saveRecentSearch({
        login: response.data.profile.login || userToFetch,
        name: response.data.profile.name || userToFetch,
        avatar: response.data.profile.avatar
      });
    } catch (err) {
      setError('User not found or API limit reached.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(username);
  }, [username]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const getCardColorClass = (index) => {
    const classes = ['card-black', 'card-green', 'card-grey', 'card-white'];
    return classes[index % classes.length];
  };

  const isFavorite = data && favorites.some(f => f.login === (data.profile.login || username));

  // Compute unique languages
  const topLanguages = data ? [...new Set(data.recentRepos.map(r => r.language).filter(Boolean))].slice(0, 5) : [];

  return (
    <div className="container fade-in" style={{ paddingTop: '2rem' }}>
      <div className="user-nav-header">
        <Link to="/" className="back-link">
          <Icons.ArrowLeft /> Back to Home
        </Link>
      </div>

      {loading && <div className="loading-state" style={{ textAlign: 'center', marginTop: '4rem' }}><span className="spinner"></span></div>}

      {error && !loading && <div className="error fade-in">{error}</div>}

      {data && !loading && (
        <div className="fade-in">
          <div className="profile-container">
            <div className="profile-avatar-card">
              <img src={data.profile.avatar} alt="Profile" className="avatar" />
              <h2>
                <a href={`https://github.com/${data.profile.login || username}`} target="_blank" rel="noopener noreferrer">
                  {data.profile.name || username}
                </a>
              </h2>
              <p style={{ opacity: 0.8, fontSize: '1.2rem', marginBottom: '1.5rem' }}>@{data.profile.login || username}</p>

              <div className="profile-actions">
                <button
                  className={`bookmark-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => toggleFavorite({
                    login: data.profile.login || username,
                    name: data.profile.name || username,
                    avatar: data.profile.avatar
                  })}
                >
                  {isFavorite ? <Icons.StarFilled /> : <Icons.Star />}
                  {isFavorite ? 'Bookmarked' : 'Bookmark'}
                </button>
                <button className="share-btn" onClick={handleShare}>
                  <Icons.Share />
                  {copied ? 'Copied!' : 'Share'}
                </button>
              </div>
            </div>

            <div className="profile-stats-card">
              <h3>GitHub Stats</h3>
              <div className="stats-grid">
                <div className="stat-box">
                  <span className="stat-label">Followers</span>
                  <span className="stat-value">{data.profile.followers}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Following</span>
                  <span className="stat-value">{data.profile.following || 0}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Public Repos</span>
                  <span className="stat-value">{data.profile.repos}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Public Gists</span>
                  <span className="stat-value">{data.profile.gists || 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="section-header-flex">
            <h2 className="section-title">Recent Work</h2>
            {topLanguages.length > 0 && (
              <div className="language-badges">
                {topLanguages.map(lang => (
                  <span key={lang} className="lang-badge">{lang}</span>
                ))}
              </div>
            )}
          </div>

          <div className="repo-grid">
            {data.recentRepos.map((repo, index) => (
              <div
                key={index}
                className={`repo-card fade-in ${getCardColorClass(index)}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <a href={`https://github.com/${data.profile.login || username}/${repo.name}`} target="_blank" rel="noopener noreferrer" className="repo-name">
                    {repo.name}
                  </a>
                  <p className="repo-desc">
                    {repo.description || "A public repository on GitHub."}
                  </p>
                </div>
                <div className="repo-stats">
                  <span className="repo-stat-item" title="Stars">
                    <Icons.Star /> {repo.stars}
                  </span>
                  <span className="repo-stat-item" title="Language">
                    <Icons.Code /> {repo.language || 'Unknown'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarMenu({ isOpen, onClose, recentSearches, favorites, clearHistory }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigate = (username) => {
    onClose();
    navigate(`/user/${username}`);
  };

  return (
    <>
      <div className="drawer-overlay fade-in" onClick={onClose}></div>
      <div className="drawer-content slide-in-right">
        <div className="drawer-header">
          <h2>Menu</h2>
          <button className="icon-btn" onClick={onClose}><Icons.X /></button>
        </div>

        <div className="drawer-body">
          {/* Favorites Section */}
          <div className="drawer-section">
            <h3 className="drawer-title">Bookmarks</h3>
            {favorites.length === 0 ? (
              <p className="drawer-empty">No bookmarked users.</p>
            ) : (
              <ul className="drawer-list">
                {favorites.map((user) => (
                  <li key={user.login} className="drawer-item" onClick={() => handleNavigate(user.login)}>
                    <img src={user.avatar} alt={user.login} className="drawer-avatar" />
                    <div className="drawer-user-info">
                      <span className="drawer-name">{user.name}</span>
                      <span className="drawer-login">@{user.login}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent Searches Section */}
          <div className="drawer-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="drawer-title">Recent Searches</h3>
              {recentSearches.length > 0 && (
                <button className="clear-btn" onClick={clearHistory} title="Clear History">
                  <Icons.Trash2 />
                </button>
              )}
            </div>

            {recentSearches.length === 0 ? (
              <p className="drawer-empty">No recent searches.</p>
            ) : (
              <ul className="drawer-list">
                {recentSearches.map((user, idx) => (
                  <li key={idx} className="drawer-item" onClick={() => handleNavigate(user.login)}>
                    <img src={user.avatar} alt={user.login} className="drawer-avatar" />
                    <div className="drawer-user-info">
                      <span className="drawer-name">{user.name}</span>
                      <span className="drawer-login">@{user.login}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => document.getElementById('global-search-input')?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/user/${query.trim()}`);
    }
  };

  return (
    <div className="drawer-overlay fade-in" style={{ zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10vh' }} onClick={onClose}>
      <div className="search-modal-box fade-in" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="search-modal-form">
          <Icons.Search />
          <input
            id="global-search-input"
            type="text"
            placeholder="Search any GitHub username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <button type="button" className="close-search-btn" onClick={onClose}>ESC</button>
        </form>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="container fade-in" style={{ paddingTop: '2rem', maxWidth: '800px', paddingBottom: '4rem' }}>
      <Link to="/" className="back-link" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
        <Icons.ArrowLeft /> Back to Home
      </Link>
      <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>About OS Tracker</h1>
      
      <div className="card-white" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', fontSize: '1.1rem', lineHeight: '1.6' }}>
        <p style={{ marginBottom: '2rem' }}>
          OS Tracker is a powerful, minimalist open-source footprint analysis tool designed for developers, recruiters, and open-source enthusiasts. 
          It provides real-time, actionable insights into GitHub profiles, analyzing top programming languages, most recently updated repositories, and core community statistics.
        </p>

        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>Our Mission</h3>
        <p style={{ marginBottom: '2rem' }}>
          The open-source ecosystem is vast and constantly evolving. Our mission is to democratize developer analytics by creating a fast, accessible, and beautifully designed platform that allows anyone to instantly visualize a developer's impact without jumping through hoops or creating accounts.
        </p>
        
        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>Core Features</h3>
        <ul style={{ marginBottom: '2rem', paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Real-Time Analytics:</strong> Fetches live data directly from the GitHub API, ensuring your insights are always accurate and up-to-date down to the second.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Language Tracking:</strong> Automatically detects, aggregates, and highlights the programming languages a developer uses most frequently across their recent public work.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Persistent Bookmarking:</strong> Allows you to save favorite developer profiles directly to your browser's local storage for lightning-fast access later.</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Adaptive Theming:</strong> A meticulously designed user interface that seamlessly switches between a high-contrast Light mode and a sleek, eye-strain-reducing Dark mode.</li>
        </ul>

        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>Design Philosophy</h3>
        <p style={{ marginBottom: '2rem' }}>
          We believe that developer tools shouldn't be entirely utilitarian. OS Tracker employs modern web design principles including <strong>glassmorphism</strong>, bold typography, and fluid micro-animations. By shedding unnecessary visual clutter and focusing on a "tech lab" aesthetic, the platform presents complex data in a highly digestible format.
        </p>

        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>Technology Stack</h3>
        <p style={{ marginBottom: '2rem' }}>
          This application is built from the ground up using a modern JavaScript stack. The highly responsive frontend is powered by <strong>React.js</strong> and bundled with <strong>Vite</strong> for exceptional performance. All styling is achieved through custom Vanilla CSS leveraging CSS Variables for dynamic theming, entirely bypassing heavy CSS frameworks. The backend utilizes <strong>Node.js</strong> and <strong>Express</strong> to securely proxy requests to the GitHub API, mitigating strict browser CORS policies and preventing rate-limiting issues.
        </p>

        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>The Project</h3>
        <p style={{ marginBottom: '2rem' }}>
          Developed as a Full Stack Development End Term Project by <strong>Raghav Mukherjee</strong>. OS Tracker serves as a testament to building responsive, user-centric, and beautifully engineered web applications.
        </p>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="container fade-in" style={{ paddingTop: '2rem', maxWidth: '800px', paddingBottom: '4rem' }}>
      <Link to="/" className="back-link" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
        <Icons.ArrowLeft /> Back to Home
      </Link>
      <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Privacy Policy</h1>
      
      <div className="card-white" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', fontSize: '1.1rem', lineHeight: '1.6' }}>
        <p style={{ marginBottom: '2rem', fontSize: '1.4rem', fontWeight: '500' }}>
          At OS Tracker, we respect your privacy. This application is designed to be as stateless and privacy-respecting as technically possible. We firmly believe that your data belongs exclusively to you.
        </p>
        
        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>Data Collection & Usage</h3>
        <p style={{ marginBottom: '2rem' }}>
          OS Tracker operates on a strict zero-collection policy. We do <strong>not</strong> require you to create an account, log in, or provide any personally identifiable information (PII). We do not maintain a remote database of users, nor do we track, collect, aggregate, or sell your search history to advertising networks or third parties. All searches made through the platform interact directly with public APIs to retrieve publicly available developer statistics.
        </p>

        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>Third-Party APIs</h3>
        <p style={{ marginBottom: '2rem' }}>
          To function and provide real-time statistics, OS Tracker makes outbound requests to the official GitHub REST API. By using this tool to search for a developer, your IP address and standard browser headers may be exposed to GitHub as part of the standard HTTP request process. We recommend reviewing GitHub's own Privacy Statement for detailed information on how they handle incoming API requests.
        </p>

        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>Local Storage & Cookies</h3>
        <p style={{ marginBottom: '2rem' }}>
          We do not use tracking cookies, analytics scripts, or tracking pixels. However, to vastly improve your user experience, OS Tracker utilizes your browser's native <strong>Local Storage</strong> API. Your "Recent Searches", "Bookmarks", and "Theme Preferences" are saved securely and entirely locally within your own browser environment. This data never leaves your physical device and can be permanently deleted at any time by clearing your browser data or utilizing the built-in clear functions found in the app's sidebar menu.
        </p>

        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>User Rights</h3>
        <p style={{ marginBottom: '2rem' }}>
          Because we do not store your data on our servers, you inherently have full control over your "Right to be Forgotten". By clearing your browser cache and local storage, you erase all traces of your interaction with the OS Tracker application. There is no account deletion process necessary.
        </p>

        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>Security Measures</h3>
        <p style={{ marginBottom: '2rem' }}>
          Because OS Tracker does not store user data remotely, there is virtually zero risk of data breaches involving your personal information from our end. You are fully in control of the data generated by your use of the application. We force HTTPS to ensure that all data transmitted between your browser and the API remains encrypted in transit.
        </p>

        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>Changes to this Policy</h3>
        <p style={{ marginBottom: '2rem' }}>
          We reserve the right to update or modify this Privacy Policy at any time. If changes are made to how we handle local data or API integrations, this document will be updated accordingly. Continued use of OS Tracker after any changes indicates your acceptance of the new policy.
        </p>

        <h3 style={{ marginTop: '3rem', marginBottom: '1rem', fontSize: '2rem' }}>Contact Information</h3>
        <p style={{ marginBottom: '2rem' }}>
          If you have any questions, concerns, or feedback regarding this Privacy Policy or the open-source nature of the application, please feel free to open an issue on the project's official GitHub repository linked in the footer.
        </p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Footer() {
  return (
    <footer className="app-footer">
      <div className="container footer-content">
        <div className="footer-logo">
          <Icons.Code /> OS Tracker
        </div>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <a href="https://github.com/RMukherjee007" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} OS Tracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

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