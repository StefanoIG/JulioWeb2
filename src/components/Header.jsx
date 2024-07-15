// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ handleLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h1 className="tutorias-title">Tutorías</h1>
      </div>
      <ul className="nav-links">
        <li className="nav-item"><Link to="/Tutorias" className="nav-link">Inicio</Link></li>
        <li className="nav-item"><Link to="/Mis-Tutorias" className="nav-link">Mis Tutorías</Link></li>
        <li className="nav-item"><Link to="/" onClick={handleLogout} className="nav-link">Cerrar Sesión</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
