import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icons from '../components/Icons';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};
const item = {
  hidden: { y: 32, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type:'spring', stiffness:90, damping:18 } }
};

// Real GitHub avatars pulled directly from GitHub CDN
const TRENDING = [
  {
    username: 'torvalds',
    label: 'Linus Torvalds',
    sub: 'Creator of Linux & Git',
    img: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    cardClass: 'card-grey',
  },
  {
    username: 'gaearon',
    label: 'Dan Abramov',
    sub: 'React core & Redux',
    img: 'https://avatars.githubusercontent.com/u/810438?v=4',
    cardClass: 'card-green',
  },
  {
    username: 'yyx990803',
    label: 'Evan You',
    sub: 'Vue.js & Vite creator',
    img: 'https://avatars.githubusercontent.com/u/499550?v=4',
    cardClass: 'card-black',
  },
];

function Home({ recentSearches }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e, u = username) => {
    if (e) e.preventDefault();
    if (!u.trim()) return;
    navigate(`/user/${u.trim()}`);
  };

  return (
    <motion.div
      className="rogue-container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* ── Hero ── */}
      <motion.div className="hero-content" variants={item}>
        <h1 className="rogue-title">
          <span className="block-line">Discover.</span>
          <span className="block-line">Analyze.</span>
          <span className="block-line highlight-text">Track&nbsp;OS.</span>
        </h1>

        <p className="hero-sub">
          Instantly explore any GitHub developer — repos, languages, stars, followers — all in one premium view.
        </p>

        <form onSubmit={handleSearch} className="search-section rogue-search">
          <input
            type="text"
            placeholder="Enter GitHub username…"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit" aria-label="Search">
            <Icons.Search />
          </button>
        </form>
      </motion.div>

      {/* ── Recent Tracks ── */}
      {recentSearches?.length > 0 && (
        <motion.div className="jump-back-in" variants={item}>
          <p className="jump-back-title">Recent Tracks</p>
          <div className="jump-back-pills">
            {recentSearches.slice(0, 6).map((user, idx) => (
              <motion.div
                key={idx}
                className="jump-back-pill"
                onClick={() => handleSearch(null, user.login)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={user.avatar} alt={user.login} />
                <span>{user.name || user.login}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Trending ── */}
      <motion.div className="landing-content" variants={container}>
        <motion.h2 className="section-title rogue-section-title" variants={item}>
          Trending Stars
        </motion.h2>

        <motion.div className="feature-cards" variants={item}>
          {TRENDING.map(({ username: u, label, sub, img, cardClass }) => (
            <motion.div
              key={u}
              className={`feature-card ${cardClass}`}
              onClick={() => handleSearch(null, u)}
              whileHover={{ y: -10, rotate: cardClass === 'card-green' ? 1 : -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src={img}
                alt={label}
                className="feature-card-img"
                loading="lazy"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <h3>{label}</h3>
              <p>{sub}</p>
              <div className="feature-arrow">→</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── How It Works ── */}
        <motion.div className="how-it-works" variants={item}>
          <h2 className="section-title rogue-section-title" style={{ marginTop:'5rem', marginBottom:'2.5rem' }}>
            How It Works
          </h2>
          <div className="steps-grid">
            {[
              { n:'01', title:'Search', body:'Type any valid GitHub username in the search bar above and hit enter.' },
              { n:'02', title:'Analyze', body:'We fetch live stats — followers, repos, gists, and top languages in real-time.' },
              { n:'03', title:'Track', body:'Browse their most recently updated repositories, star counts, and activity.' },
            ].map(({ n, title, body }) => (
              <motion.div
                key={n}
                className="step-card"
                whileHover={{ scale: 1.03, y: -6 }}
              >
                <div className="step-number">{n}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Home;
