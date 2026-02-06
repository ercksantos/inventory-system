import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md transition-colors ${isActive
      ? 'bg-blue-600 text-white'
      : 'text-gray-700 hover:bg-gray-200'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-md transition-colors ${isActive
      ? 'bg-blue-600 text-white'
      : 'text-gray-700 hover:bg-gray-100'
    }`;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-xl font-bold text-gray-800" onClick={closeMobileMenu}>
            Sistema de Estoque
          </NavLink>

          <div className="hidden md:flex gap-2">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={linkClass}>
              Produtos
            </NavLink>
            <NavLink to="/raw-materials" className={linkClass}>
              Matérias-Primas
            </NavLink>
            <NavLink to="/composition" className={linkClass}>
              Composição
            </NavLink>
            <NavLink to="/production" className={linkClass}>
              Produção
            </NavLink>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fadeIn">
            <NavLink to="/" className={mobileLinkClass} onClick={closeMobileMenu}>
              Home
            </NavLink>
            <NavLink to="/products" className={mobileLinkClass} onClick={closeMobileMenu}>
              Produtos
            </NavLink>
            <NavLink to="/raw-materials" className={mobileLinkClass} onClick={closeMobileMenu}>
              Matérias-Primas
            </NavLink>
            <NavLink to="/composition" className={mobileLinkClass} onClick={closeMobileMenu}>
              Composição
            </NavLink>
            <NavLink to="/production" className={mobileLinkClass} onClick={closeMobileMenu}>
              Produção
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
