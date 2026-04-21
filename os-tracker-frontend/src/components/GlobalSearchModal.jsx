// GlobalSearchModal Component
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from './Icons';

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

export default GlobalSearchModal;
