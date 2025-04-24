import { useTheme } from "@/context/ThemeContext"; // Use ThemeContext
import { Button } from "@/components/ui/button";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme(); // Get theme and toggle function from context

  return (
    <div className="flex justify-end p-4">
      <Button
        onClick={toggleTheme} // Toggle theme using context
        className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:scale-105 transition-transform"
      >
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </Button>
    </div>
  );
}
