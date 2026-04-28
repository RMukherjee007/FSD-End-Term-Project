import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import Icons from './Icons';
import { AuthContext } from '../context/AuthContext';

function SidebarMenu({ isOpen, onClose, recentSearches, favorites, clearHistory }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  if (!isOpen) return null;

  const handleNavigate = (username) => {
    onClose();
    navigate(`/user/${username}`);
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
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
                {favorites.map((favUser) => (
                  <li key={favUser.login} className="drawer-item" onClick={() => handleNavigate(favUser.login)}>
                    <img src={favUser.avatar} alt={favUser.login} className="drawer-avatar" />
                    <div className="drawer-user-info">
                      <span className="drawer-name">{favUser.name}</span>
                      <span className="drawer-login">@{favUser.login}</span>
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
                {recentSearches.map((sUser, idx) => (
                  <li key={idx} className="drawer-item" onClick={() => handleNavigate(sUser.login)}>
                    <img src={sUser.avatar} alt={sUser.login} className="drawer-avatar" />
                    <div className="drawer-user-info">
                      <span className="drawer-name">{sUser.name}</span>
                      <span className="drawer-login">@{sUser.login}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Auth Section at bottom */}
        <div className="drawer-section" style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid var(--border)' }}>
          {user ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>{user.username}</span>
              <button onClick={handleLogout} className="share-btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
              <Link to="/login" onClick={onClose} className="share-btn" style={{ textAlign: 'center', display: 'block', padding: '0.6rem' }}>Login</Link>
              <Link to="/register" onClick={onClose} className="bookmark-btn" style={{ textAlign: 'center', display: 'block', padding: '0.6rem' }}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SidebarMenu;
