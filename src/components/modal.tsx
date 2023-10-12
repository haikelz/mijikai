"use client";

import { useAtom } from "jotai";
import { HTMLAttributes, useRef } from "react";
import { useClickOutside } from "~hooks";
import { tw } from "~lib/helpers";
import { isShowedModalAtom } from "~store";
import { ChildrenProps } from "~types";

type ModalProps = ChildrenProps & HTMLAttributes<HTMLDivElement>;

export default function Modal({ children, ...props }: ModalProps) {
  const [isShowedModal, setIsShowedModal] = useAtom(isShowedModalAtom);

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(setIsShowedModal, modalRef);

  return (
    <>
      {isShowedModal ? (
        <div
          className={tw(
            "fixed z-10 inset-0 w-full h-full min-h-screen",
            "flex bg-black/70 justify-center items-center"
          )}
          {...props}
        >
          <div ref={modalRef} className="bg-white rounded-md p-6 shadow-md">
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
