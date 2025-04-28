import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
};