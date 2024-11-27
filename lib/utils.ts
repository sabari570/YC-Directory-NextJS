import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// This is a custom function created to parse all the server responses
export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

export enum RESPONSE_STATUS {
  ERROR,
  SUCCESS,
}
