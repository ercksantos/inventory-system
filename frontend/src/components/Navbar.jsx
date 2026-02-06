import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-xl font-bold text-gray-800">
            Sistema de Estoque
          </NavLink>

          <div className="flex gap-2">
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
