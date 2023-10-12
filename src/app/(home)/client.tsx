"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { Copy, CopyCheck, QrCodeIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useClipboard } from "use-clipboard-copy";
import Modal from "~components/modal";
import QrCode from "~components/qr-code";
import { Button } from "~components/ui/button";
import { Paragraph } from "~components/ui/typography";
import { tw } from "~lib/helpers";
import { postData } from "~lib/utils/axios-config";
import { inputSchema } from "~lib/utils/schema";
import { isShowedModalAtom } from "~store";
import { ShortenedUrlProps } from "~types";

import ErrorClient from "./error-client";
import LoadingClient from "./loading-client";

const isGenerateQrCodeAtom = atom<boolean>(false);

type DataProps = {
  data: ShortenedUrlProps;
};

export default function HomeClient() {
  const [isGenerateQrCode, setIsGenerateQrCode] = useAtom(isGenerateQrCodeAtom);
  const [isShowedModal, setIsShowedModal] = useAtom(isShowedModalAtom);

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { original_url: "" },
    resolver: zodResolver(inputSchema),
  });

  const clipboard = useClipboard({ copiedTimeout: 900 });

  const queryClient: QueryClient = useQueryClient();

  const { data, isLoading, isError, mutate } = useMutation({
    mutationFn: postData,
    onSuccess: () => queryClient.invalidateQueries(),
  });

  function onSubmit() {
    mutate(getValues("original_url"));
  }

  const detail: DataProps = data;

  if (isLoading) return <LoadingClient />;
  if (isError) return <ErrorClient />;

  return (
    <>
      <div>
        <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center">
            <div className="px-3 py-2 rounded-l-md bg-gray-300">
              <Paragraph className="font-bold">https://</Paragraph>
            </div>
            <input
              {...register("original_url", { required: true })}
              type="text"
              className={tw(
                "flex w-full rounded-r-md h-11 border border-input font-medium",
                "bg-background px-3 py-2 text-sm ring-offset-background",
                "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                "placeholder:text-muted-foreground focus-visible:outline-none",
                "focus-visible:ring-ring",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </div>
          {errors.original_url ? (
            <p className="mt-2 font-semibold">{errors.original_url.message} </p>
          ) : null}
        </form>
        {data ? (
          <>
            <div className="flex flex-col mt-3 justify-start items-start">
              <Paragraph>Result:</Paragraph>
              <Link
                href={`${detail.data.shortened_url}`}
                className="mt-4 underline underline-offset-2 font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://mijikai.space/{detail.data.shortened_url}
              </Link>
              <div className="flex items-center space-x-2 mt-3">
                <Button
                  type="button"
                  aria-label="copy to clipboard"
                  onClick={() =>
                    clipboard.copy(
                      `https://mijikai.space/${detail.data.shortened_url}`
                    )
                  }
                >
                  <div className="space-x-2.5 flex">
                    {clipboard.copied ? (
                      <>
                        <span>Copied!</span>
                        <CopyCheck />
                      </>
                    ) : (
                      <>
                        <span>Copy</span>
                        <Copy />
                      </>
                    )}
                  </div>
                </Button>
                <Button
                  onClick={() => {
                    setIsGenerateQrCode(true);
                    setIsShowedModal(true);
                  }}
                  className="space-x-2.5"
                >
                  <span>Generate QR Code</span>
                  <QrCodeIcon />
                </Button>
              </div>
            </div>
            {isGenerateQrCode && isShowedModal ? (
              <Modal>
                <QrCode url={detail.data.original_url} />
              </Modal>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
}
