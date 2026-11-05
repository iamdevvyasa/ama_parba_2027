import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's stock class names. Our fluid type scale
 * (`text-fluid-sm` and friends) is custom, so without this it is mistaken for a
 * text *colour* and silently cancels out `text-ivory` on the same element.
 * Registering the scale keeps size and colour in separate conflict groups.
 */
const fluidSizes = [
  "fluid-xs",
  "fluid-sm",
  "fluid-base",
  "fluid-lg",
  "fluid-xl",
  "fluid-2xl",
  "fluid-3xl",
  "fluid-4xl",
  "fluid-5xl",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: fluidSizes }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
