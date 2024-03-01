import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const tw = (...className: ClassValue[]) => twMerge(clsx(className));
