import { useNavigate } from 'react-router-dom';
import { createSession } from '../api/session';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '');
    const password = String(form.get('password') || '');
    
    try {
      const { user, token } = await createSession(email, password);
      login(user, token);
      navigate('/products');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login Error.  Please check your email and password.');
    }
  };

  return (
    <div className="flex justify-center py-20">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded border border-improbable px-3 py-2 bg-milkGlass text-satinDeepBlack focus:outline-none focus:ring-2 focus:ring-ducati"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded border border-improbable px-3 py-2 bg-milkGlass text-satinDeepBlack focus:outline-none focus:ring-2 focus:ring-ducati"
              placeholder="••••••••"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
