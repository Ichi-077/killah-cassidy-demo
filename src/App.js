import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LocationsPage from './pages/LocationsPage';
import LocationDetailPage from './pages/LocationDetailPage';
import MerchandisePage from './pages/MerchandisePage';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <Link to="/" onClick={closeMenu}>
                Killah Cassidy
              </Link>
            </div>

            <button
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <li className="nav-item">
                <Link to="/" onClick={closeMenu}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/locations" onClick={closeMenu}>Locations</Link>
              </li>
              <li className="nav-item">
                <Link to="/merchandise" onClick={closeMenu}>Merchandise</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" onClick={closeMenu}>Admin</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/location/:id" element={<LocationDetailPage />} />
            <Route path="/merchandise" element={<MerchandisePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
