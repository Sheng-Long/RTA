import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-blueCharcoal text-blueToYou">
      <AppHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="text-center p-4 border-t border-improbable">
        2025
      </footer>
    </div>
  );
};

export default Layout;
