import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type ShortenedUrlProps = {
  id: string;
  created_at: string;
  original_url: string;
  shortened_url: string;
  email: string;
  image: string;
  name: string;
};

export type ResponseStatusProps<T> = {
  status: string;
  message: string;
  data?: T;
};
