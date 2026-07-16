import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="rounded-full border border-slate-700 p-2 text-slate-300"
    >
      {dark ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
};

export default ThemeToggle;
