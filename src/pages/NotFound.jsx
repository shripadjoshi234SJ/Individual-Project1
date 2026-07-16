import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-violet-500">404</h1>
        <p className="mt-4 text-xl text-white">Page not found</p>
        <Link to="/" className="mt-6 inline-block rounded-lg bg-violet-600 px-4 py-2 text-white">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
