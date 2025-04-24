// src/App.jsx
import HomePage from "@/HomePage";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggleButton from "@/components/ThemeToggleButton";

function App() {
  return (
    <ThemeProvider>
      <div className="transition-colors duration-500 bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
        <HomePage />
        <ThemeToggleButton /> {/* Ensure this is only here */}
      </div>
    </ThemeProvider>
  );
}

export default App;
