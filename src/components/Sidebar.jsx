import { NavLink } from 'react-router-dom';
import { FiHome, FiUploadCloud, FiUser } from 'react-icons/fi';

const Sidebar = () => {
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: FiHome },
    { to: '/upload', label: 'Upload', icon: FiUploadCloud },
    { to: '/profile', label: 'Profile', icon: FiUser },
  ];

  return (
    <aside className="hidden w-64 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 lg:block">
      <h2 className="mb-6 text-lg font-semibold text-white">Menu</h2>
      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${isActive ? 'bg-violet-600/20 text-violet-300' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
