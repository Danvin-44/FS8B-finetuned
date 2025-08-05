"use client";
import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export const Button: React.FC<ButtonProps> = ({ className, variant = "default", ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded font-medium transition",
        variant === "outline" && "border border-gray-300 bg-white text-black",
        variant === "ghost" && "bg-transparent text-black hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
};

export default Button;
