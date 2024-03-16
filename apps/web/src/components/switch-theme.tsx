"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~components/ui/dropdown";
import { tw } from "~lib/helpers";

import { Button } from "./ui/button";

export default function SwitchTheme() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon
            className={tw(
              "h-[1.2rem] w-[1.2rem] rotate-0 scale-100",
              "transition-all dark:-rotate-90 dark:scale-0"
            )}
          />
          <MoonIcon
            className={tw(
              "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0",
              "transition-all dark:rotate-0 dark:scale-100"
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="font-semibold"
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-semibold"
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-semibold"
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
