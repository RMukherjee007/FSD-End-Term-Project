import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      // Fetching from your specific local backend port!
      const response = await axios.get(`http://localhost:5001/api/github/${username}`);
      setData(response.data);
    } catch (err) {
      setError('User not found or API limit reached.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Open Source Contribution Tracker</h1>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-section">
        <input 
          type="text" 
          placeholder="Enter GitHub username (e.g., RMukherjee007)" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Dashboard Display */}
      {data && (
        <div>
          {/* Profile Section */}
          <div className="profile-card">
            <img src={data.profile.avatar} alt="Profile" className="avatar" />
            <div>
              <h2>{data.profile.name || username}</h2>
              <p>Followers: {data.profile.followers} | Public Repos: {data.profile.repos}</p>
            </div>
          </div>

          {/* Repositories Section */}
          <h3>Recent Repositories</h3>
          <div className="repo-grid">
            {data.recentRepos.map((repo, index) => (
              <div key={index} className="repo-card">
                <span className="repo-name">{repo.name}</span>
                <span className="repo-stats">
                  ⭐ {repo.stars} | 💻 {repo.language || 'Unknown'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;