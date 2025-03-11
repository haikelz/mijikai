import { useSetAtom } from "jotai";
import { Button } from "~components/ui/button";
import { idLinkAtom, isShowModalAtom } from "~store";

export function ButtonDeleteLink({ id }: { id: number }) {
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
