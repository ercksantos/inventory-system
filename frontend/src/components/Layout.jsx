import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            Sistema de Estoque © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
