"use client";

import { useAtomValue } from "jotai";
import { Paragraph } from "~components/ui/typography";
import { tw } from "~lib/helpers";
import { isSuccessDeleteLinkAtom } from "~store";

export function ModalSuccessDeleteLink() {
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
