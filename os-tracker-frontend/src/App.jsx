import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Reusable SVG Icons
const Icons = {
  Search: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Users: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Repo: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path><path d="M2 10h20"></path><path d="M7 15h.01"></path><path d="M11 15h2"></path></svg>,
  Star: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  Code: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  Clock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
};

function App() {
  const [username, setUsername] = useState('');
  const [searchedUser, setSearchedUser] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveRecentSearch = (term) => {
    const lowerTerm = term.toLowerCase();
    let updated = [term, ...recentSearches.filter(s => s.toLowerCase() !== lowerTerm)];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearch = async (e, searchUsername = username) => {
    if (e) e.preventDefault();
    if (!searchUsername) return;

    setUsername(searchUsername);
    setLoading(true);
    setError('');
    setData(null);

    try {
      // Use dynamic URL: relative in production (monolith), localhost in dev
      const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? `http://localhost:5001/api/github/${searchUsername}`
        : `/api/github/${searchUsername}`;
        
      const response = await axios.get(apiUrl);
      setData(response.data);
      setSearchedUser(searchUsername);
      saveRecentSearch(searchUsername);
    } catch (err) {
      setError('User not found or API limit reached.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to get alternating card colors
  const getCardColorClass = (index) => {
    const classes = ['card-black', 'card-green', 'card-grey', 'card-white'];
    return classes[index % classes.length];
  };

  return (
    <div className="container fade-in">
      <h1>Track your open source footprint.</h1>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-section">
        <input 
          type="text" 
          placeholder="Enter GitHub username..." 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner"></span> : <Icons.Search />}
        </button>
      </form>

      {/* Error Message */}
      {error && <div className="error fade-in">{error}</div>}

      {/* Empty State / Landing Page Content */}
      {!data && !loading && (
        <div className="landing-content fade-in">
          {recentSearches.length > 0 && (
            <div className="recent-searches">
              <span className="recent-title"><Icons.Clock /> Recent:</span>
              <div className="recent-pills">
                {recentSearches.map((term, index) => (
                  <button 
                    key={index} 
                    className="search-pill"
                    onClick={() => handleSearch(null, term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

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
        </div>
      )}

      {/* Dashboard Display */}
      {data && (
        <div className="fade-in">
          {/* Profile Section */}
          <div className="profile-container">
            <div className="profile-avatar-card">
              <img src={data.profile.avatar} alt="Profile" className="avatar" />
              <h2>
                <a href={`https://github.com/${data.profile.login || searchedUser}`} target="_blank" rel="noopener noreferrer">
                  {data.profile.name || searchedUser}
                </a>
              </h2>
              <p style={{ opacity: 0.8, fontSize: '1.2rem' }}>@{data.profile.login || searchedUser}</p>
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

          {/* Repositories Section */}
          <h2 className="section-title">Recent Work</h2>
          <div className="repo-grid">
            {data.recentRepos.map((repo, index) => (
              <div 
                key={index} 
                className={`repo-card fade-in ${getCardColorClass(index)}`} 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <a href={`https://github.com/${data.profile.login || searchedUser}/${repo.name}`} target="_blank" rel="noopener noreferrer" className="repo-name">
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

export default App;