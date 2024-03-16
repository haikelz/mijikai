import { ChildrenProps } from "@types";
import { InfoIcon } from "lucide-react";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Paragraph } from "./ui/typography";

type InfoProps = ChildrenProps & { size: "icon" | "sm" };

export default function Info({ children, size }: InfoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {size === "icon" ? (
          <Button variant="outline" size="icon">
            <InfoIcon />
          </Button>
        ) : size === "sm" ? (
          <button type="button" aria-label="trigger button">
            <InfoIcon size={16} />
          </button>
        ) : null}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Paragraph>{children}</Paragraph>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
