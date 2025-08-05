"use client";
import { useCallback } from "react";

export function useToast() {
  // Simple placeholder for toast logic
  return {
    toast: useCallback((msg: string) => alert(msg), [])
  };
}
