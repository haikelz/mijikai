"use client";

import { ChildrenProps } from "@types";
import { useAtom } from "jotai";
import { HTMLAttributes, useRef } from "react";
import { useClickOutside } from "~hooks/use-click-outside";
import { tw } from "~lib/helpers";
import { isShowModalAtom } from "~store";

type ModalProps = ChildrenProps & HTMLAttributes<HTMLDivElement>;

export function Modal({ children, ...props }: ModalProps) {
  const [isShowModal, setIsShowModal] = useAtom(isShowModalAtom);

  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(setIsShowModal, modalRef as any);

  return (
    <>
      {isShowModal ? (
        <div
          className={tw(
            "fixed z-10 inset-0 w-full h-full min-h-screen backdrop-blur-md",
            "flex bg-black/70 justify-center items-center"
          )}
          {...props}
        >
          <div ref={modalRef} className="bg-card rounded-md p-6 shadow-md">
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
