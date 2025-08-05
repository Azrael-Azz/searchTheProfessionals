import './notFound.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! Page not found.</p>
      <Link to="/home" className="not-found-link">Go Back Home</Link>
    </div>
  );
};

export default NotFoundPage;