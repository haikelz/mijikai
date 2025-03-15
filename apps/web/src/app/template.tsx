"use client";

import { ChildrenProps } from "@types";
import { setDefaultOptions } from "date-fns";
import { id } from "date-fns/locale";

// Set locale to Indonesia(ID)
setDefaultOptions({ locale: id });

export default function Template({ children }: ChildrenProps) {
  return children;
}
