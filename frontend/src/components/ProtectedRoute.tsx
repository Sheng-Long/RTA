import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Access Denied</h1>
          <p className="mb-6">You must be logged in to access this page.</p>
          <a href="/login" className="inline-block px-4 py-2 bg-washedBlack border border-sightful text-sightful rounded hover:bg-satinDeepBlack">
            Login
          </a>
        </div>
      </div>
    );
  }

  return <Outlet />;
};
