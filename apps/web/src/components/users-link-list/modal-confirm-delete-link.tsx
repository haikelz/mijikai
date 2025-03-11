"use client";

import { useAtom } from "jotai";
import { Button } from "~components/ui/button";
import { Modal } from "~components/ui/modal";
import { Paragraph } from "~components/ui/typography";
import { isShowModalAtom } from "~store";

export function ModalConfirmDeleteLink({
  handleDelete,
}: {
  handleDelete: () => Promise<void>;
}) {
  const [isShowModal, setIsShowModal] = useAtom(isShowModalAtom);

  return (
    <>
      {isShowModal ? (
        <Modal data-cy="confirm-delete-link-modal">
          <div className="flex justify-center items-center flex-col">
            <Paragraph className="text-xl font-bold">
              Are you sure you want to delete this link?
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
