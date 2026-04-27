import { Link } from 'react-router-dom';
import Icons from './Icons';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="container footer-content">
        <div className="footer-logo">
          <Icons.Code />
          OS Tracker
        </div>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <a href="https://github.com/RMukherjee007/FSD-End-Term-Project" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} OS Tracker — Built with React &amp; Framer Motion
        </div>
      </div>
    </footer>
  );
}

export default Footer;
