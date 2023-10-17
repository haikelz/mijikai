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
import { idLinkAtom, isShowModalAtom, isSuccessDeleteAtom } from "~store";

export function ConfirmDeleteLinkModal() {
  const idLink = useAtomValue(idLinkAtom);

  const [isShowModal, setIsShowModal] = useAtom(isShowModalAtom);
  const [isSuccessDelete, setIsSuccessDelete] = useAtom(isSuccessDeleteAtom);

  const queryClient: QueryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteData,
    mutationKey: [idLink],
    onSuccess: () => queryClient.invalidateQueries(),
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
        <Modal>
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

export function SuccessModal() {
  const isSuccessDelete = useAtomValue(isSuccessDeleteAtom);

  return (
    <>
      {isSuccessDelete ? (
        <div
          className={tw(
            "fixed z-10 inset-0 w-full h-full min-h-screen",
            "flex bg-black/70 justify-center items-center"
          )}
        >
          <div className="bg-white rounded-md p-6 shadow-md">
            <div className="flex justify-center items-center flex-col">
              <Paragraph className="font-bold text-xl">
                Success delete data!
              </Paragraph>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
