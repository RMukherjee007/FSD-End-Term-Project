import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icons from '../components/Icons';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const item = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type:'spring', stiffness:90, damping:18 } }
};

function UserResult({ saveRecentSearch, toggleFavorite, favorites }) {
  const { username } = useParams();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [copied, setCopied]   = useState(false);

  const fetchUserData = async (u) => {
    setLoading(true); setError(''); setData(null);
    try {
      const base = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5001'
        : '';
      const res = await axios.get(`${base}/api/github/${u}`);
      setData(res.data);
      saveRecentSearch({
        login:  res.data.profile.login || u,
        name:   res.data.profile.name  || u,
        avatar: res.data.profile.avatar,
      });
    } catch {
      setError('User not found or API rate limit reached.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUserData(username); }, [username]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const COLORS = ['card-black','card-green','card-grey','card-white'];
  const isFav  = data && favorites.some(f => f.login === (data.profile.login || username));
  const langs  = data ? [...new Set(data.recentRepos.map(r => r.language).filter(Boolean))].slice(0,6) : [];

  return (
    <div className="container fade-in" style={{ paddingTop:'1.5rem' }}>
      <div className="user-nav-header">
        <Link to="/" className="back-link">
          <Icons.ArrowLeft /> Back to Home
        </Link>
      </div>

      {loading && (
        <div className="loading-state">
          <motion.div
            animate={{ rotate:360 }}
            transition={{ repeat:Infinity, duration:0.9, ease:'linear' }}
            style={{ width:40, height:40, border:'4px solid var(--border)', borderTopColor:'var(--accent)', borderRadius:'50%', display:'inline-block' }}
          />
        </div>
      )}

      {error && !loading && <div className="error fade-in">{error}</div>}

      {data && !loading && (
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* ── Profile Header ── */}
          <motion.div className="profile-container" variants={item}>
            <div className="profile-avatar-card">
              <img src={data.profile.avatar} alt="Avatar" className="avatar" />
              <h2>
                <a href={`https://github.com/${data.profile.login || username}`}
                   target="_blank" rel="noopener noreferrer">
                  {data.profile.name || username}
                </a>
              </h2>
              <p style={{ opacity:0.75, fontSize:'1rem', marginBottom:'1rem' }}>
                @{data.profile.login || username}
              </p>
              {data.profile.bio && (
                <p style={{ fontSize:'0.9rem', opacity:0.7, maxWidth:240, lineHeight:1.5 }}>
                  {data.profile.bio}
                </p>
              )}
              <div className="profile-actions">
                <button
                  className={`bookmark-btn ${isFav ? 'active' : ''}`}
                  onClick={() => toggleFavorite({
                    login: data.profile.login || username,
                    name:  data.profile.name  || username,
                    avatar:data.profile.avatar,
                  })}
                >
                  {isFav ? <Icons.StarFilled /> : <Icons.Star />}
                  {isFav ? 'Saved' : 'Save'}
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
                {[
                  { label:'Followers',   value:data.profile.followers },
                  { label:'Following',   value:data.profile.following  || 0 },
                  { label:'Public Repos',value:data.profile.repos },
                  { label:'Public Gists',value:data.profile.gists      || 0 },
                ].map(({ label, value }) => (
                  <div key={label} className="stat-box">
                    <span className="stat-label">{label}</span>
                    <motion.span
                      className="stat-value"
                      initial={{ opacity:0, y:12 }}
                      animate={{ opacity:1, y:0 }}
                      transition={{ duration:0.5 }}
                    >
                      {value?.toLocaleString()}
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Repos ── */}
          <motion.div variants={item}>
            <div className="section-header-flex">
              <h2 className="section-title">Recent Work</h2>
              {langs.length > 0 && (
                <div className="language-badges">
                  {langs.map(l => <span key={l} className="lang-badge">{l}</span>)}
                </div>
              )}
            </div>

            <div className="repo-grid">
              {data.recentRepos.map((repo, i) => (
                <motion.div
                  key={i}
                  className={`repo-card ${COLORS[i % COLORS.length]}`}
                  initial={{ opacity:0, y:20 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay: i * 0.07, type:'spring', stiffness:80 }}
                  whileHover={{ y:-6 }}
                >
                  <div>
                    <a
                      href={`https://github.com/${data.profile.login || username}/${repo.name}`}
                      target="_blank" rel="noopener noreferrer"
                      className="repo-name"
                    >
                      {repo.name}
                    </a>
                    <p className="repo-desc">
                      {repo.description || 'A public repository on GitHub.'}
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default UserResult;
