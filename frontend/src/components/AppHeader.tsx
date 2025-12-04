import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const AppHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b border-improbable">
      <div
        className="mx-auto flex max-w-[1440px] justify-between items-center pt-[60px] pb-6 px-[30px]"
      >
        <Link to={user ? "/products" : "/login"} className="font-semibold text-[30px] text-sightful">
          RTA
        </Link>
        <nav className="space-x-4 flex items-center">
          <Link to="/cart">
            Cart
            {totalItems > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-sightful text-blueCharcoal text-xs rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <span onClick={handleLogout} className="cursor-pointer">
              Logout
            </span>
          ) : (
            <Link to="/login">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
