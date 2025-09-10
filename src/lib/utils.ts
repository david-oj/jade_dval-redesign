import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateFutureDate(val: string) {
  const selected = new Date(val);
  if (isNaN(selected.getTime())) return false; // invalid date
  const today = new Date();
  today.setHours(0, 0, 0, 0); //normalize
  return selected >= today;
}

export const formatDate = (isoString: string, options?: Intl.DateTimeFormatOptions) => {
  try{
    const date = new Date(isoString);
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      ...options
    });
  }catch{
    return isoString;
  }
};
