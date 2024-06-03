import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
      return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}