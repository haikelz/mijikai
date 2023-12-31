import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type ShortenedUrlProps = {
  id: number;
  created_at: string;
  original_url: string;
  shortened_url: string;
  email: string;
  image: string;
  name: string;
};
