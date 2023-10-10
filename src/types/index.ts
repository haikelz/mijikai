import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type ShortenedUrlProps = {
  original_url: string;
  shortened_url: string;
};
