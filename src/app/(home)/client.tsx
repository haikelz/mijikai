"use client";

import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { useClipboard } from "use-clipboard-copy";
import QrCode from "~components/qr-code";
import { Button } from "~components/ui/button";
import { Input } from "~components/ui/input";
import { Paragraph } from "~components/ui/typography";
import { postData } from "~lib/utils/axios-config";
import { ShortenedUrlProps } from "~types";

import ErrorClient from "./error-client";
import LoadingClient from "./loading-client";

type DataProps = {
  data: ShortenedUrlProps;
};

export default function HomeClient() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isGenerateQrCode, setIsGenerateQrCode] = useState<boolean>(false);

  const clipboard = useClipboard({ copiedTimeout: 900 });

  const queryClient: QueryClient = useQueryClient();

  const { data, isLoading, isError, mutateAsync } = useMutation({
    mutationFn: postData,
    onSuccess: () => queryClient.invalidateQueries(),
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await mutateAsync(inputRef.current?.value as string);
  }

  const detail: DataProps = data;

  if (isLoading) return <LoadingClient />;
  if (isError) return <ErrorClient />;

  return (
    <div>
      <form className="mt-3" onSubmit={handleSubmit}>
        <Input ref={inputRef} />
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
              https://mijikai.tech/{detail.data.shortened_url}
            </Link>
            <div className="flex items-center space-x-2 mt-3">
              <Button
                type="button"
                aria-label="copy to clipboard"
                onClick={() =>
                  clipboard.copy(
                    `https://mijikai.tech/${detail.data.shortened_url}`
                  )
                }
              >
                {clipboard.copied ? "Copied!" : "Copy"}
              </Button>
              <Button onClick={() => setIsGenerateQrCode(true)}>
                Generate Qr Code
              </Button>
            </div>
          </div>
          {isGenerateQrCode ? <QrCode url={detail.data.original_url} /> : null}
        </>
      ) : null}
    </div>
  );
}
