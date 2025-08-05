"use client";
import React from "react";
import { cn } from "../../lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ className, ...props }) => (
  <label className={cn("block text-sm font-medium text-gray-700", className)} {...props} />
);

export default Label;
