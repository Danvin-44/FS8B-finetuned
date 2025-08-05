"use client";
import React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => (
  <textarea className={cn("w-full p-2 border rounded", className)} {...props} />
);

export default Textarea;
