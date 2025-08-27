import { colors } from "../constants/colors";

export const useColors = () => {
  return {
    ...colors,
    // Utility functions to generate Tailwind classes
    getTailwindClasses: {
      input: {
        base: `w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border border-yellow-500/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200`,
        error: `border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20`,
      },
      button: {
        primary: `bg-red-900 hover:bg-red-800 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200`,
      },
      card: {
        primary: `bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-2xl rounded-2xl`,
      },
      errorMessage: `bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r`,
    },
  };
};
