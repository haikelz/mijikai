"use client";

import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Button } from "~components/ui/button";
import { Modal } from "~components/ui/modal";
import { Paragraph } from "~components/ui/typography";
import { tw } from "~lib/helpers";
import { deleteData } from "~lib/utils/axios-config";
import { idLinkAtom, isShowModalAtom, isSuccessDeleteLinkAtom } from "~store";

export function ConfirmDeleteLinkModal() {
  const [isShowModal, setIsShowModal] = useAtom(isShowModalAtom);

  const idLink = useAtomValue(idLinkAtom);
  const setIsSuccessDelete = useSetAtom(isSuccessDeleteLinkAtom);

  const queryClient: QueryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteData,
    mutationKey: [idLink],
    onSuccess: () =>
      queryClient.refetchQueries({ queryKey: [idLink], exact: true }),
  });

  function handleDelete() {
    mutate(idLink);

    setIsShowModal(false);

    setTimeout(() => {
      setIsSuccessDelete(false);
    }, 2000);

    setIsSuccessDelete(true);
    window.location.reload();
  }

  return (
    <>
      {isShowModal ? (
        <Modal data-cy="confirm-delete-link-modal">
          <div className="flex justify-center items-center flex-col">
            <Paragraph className="text-xl font-bold">
              You want to delete this link?
            </Paragraph>
            <div className="flex justify-center items-center mt-3 space-x-3 w-full">
              <Button
                type="button"
                aria-label="cancel"
                onClick={() => setIsShowModal(false)}
                variant="secondary"
                className="font-bold"
              >
                Cancel
              </Button>
              <Button
                type="button"
                aria-label="delete"
                onClick={handleDelete}
                variant="destructive"
                className="font-bold"
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export function DeleteLinkButton({ id }: { id: number }) {
  const setIdLink = useSetAtom(idLinkAtom);

  const setConfirmDeleteLink = useSetAtom(isShowModalAtom);

  function handleClick() {
    setConfirmDeleteLink(true);
    setIdLink(id);
  }

  return (
    <Button
      data-cy="confirm-delete-link-button"
      type="button"
      aria-label="confirm delete link"
      onClick={handleClick}
      variant="destructive"
      className="font-bold"
    >
      Delete
    </Button>
  );
}

export function SuccessDeleteLinkModal() {
  const isSuccessDeleteLink = useAtomValue(isSuccessDeleteLinkAtom);

  return (
    <>
      {isSuccessDeleteLink ? (
        <div
          data-cy="success-delete-link-modal"
          className={tw(
            "fixed z-10 inset-0 w-full h-full min-h-screen backdrop-blur-md",
            "flex bg-black/70 justify-center items-center"
          )}
        >
          <div className="bg-card rounded-md p-6 shadow-md">
            <div className="flex justify-center items-center flex-col">
              <Paragraph className="font-bold text-xl">
                Success delete Link!
              </Paragraph>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
