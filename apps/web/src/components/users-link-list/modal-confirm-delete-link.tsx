import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Button } from "~components/ui/button";
import { Modal } from "~components/ui/modal";
import { Paragraph } from "~components/ui/typography";
import { deleteUrl } from "~services";
import { idLinkAtom, isShowModalAtom, isSuccessDeleteLinkAtom } from "~store";

export function ModalConfirmDeleteLink() {
  const [isShowModal, setIsShowModal] = useAtom(isShowModalAtom);

  const idLink = useAtomValue(idLinkAtom);
  const setIsSuccessDelete = useSetAtom(isSuccessDeleteLinkAtom);

  const queryClient: QueryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => await deleteUrl(idLink),
    mutationKey: [idLink],
    onSuccess: () =>
      queryClient.refetchQueries({ queryKey: [idLink], exact: true }),
  });

  async function handleDelete() {
    await deleteMutation.mutateAsync().then(() => {
      setIsShowModal(false);
      setIsSuccessDelete(true);
    });
  }

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
