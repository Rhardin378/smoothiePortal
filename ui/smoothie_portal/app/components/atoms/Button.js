import React from "react";

export const Button = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
}) => {
  // --- Logic for styling will go here ---
  // We need to figure out which CSS classes to apply
  // based on the `variant` and `disabled` props.

  const baseClasses =
    "px-4 py-2 font-bold rounded-md focus:outline-none transition-all duration-300";

  const variantClasses = {
    primary: "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-700 text-white hover:bg-red-800",
  };
  const disabledClasses = "opacity-50 cursor-not-allowed";

  const classes = [
    baseClasses,
    variantClasses[variant],
    disabled ? disabledClasses : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
  // How can we add classes for the 'primary' variant?
  // How can we add classes when it's disabled?
};
