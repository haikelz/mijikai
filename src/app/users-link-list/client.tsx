"use client";

import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Button } from "~components/ui/button";
import { deleteData } from "~lib/utils/axios-config";

export function DeleteLinkButton({ id }: { id: number }) {
  const queryClient: QueryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => queryClient.invalidateQueries(),
  });

  function handleClick() {
    mutate(id);
    window.location.reload();
  }

  return (
    <Button onClick={handleClick} variant="destructive" className="font-bold">
      Delete
    </Button>
  );
}
