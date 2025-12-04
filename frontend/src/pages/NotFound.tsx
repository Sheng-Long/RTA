import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-1 items-center justify-center bg-blueCharcoal text-blueToYou">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-sightful">Page not found</p>
        <div className="mt-5">
          <Link
            to="/"
            className="px-4 py-2 bg-washedBlack border border-sightful text-sightful rounded hover:bg-satinDeepBlack"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
