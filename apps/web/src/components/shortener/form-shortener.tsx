"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ShortenedUrlProps } from "@types";
import { atom, useAtom } from "jotai";
import { CopyCheckIcon, CopyIcon, GithubIcon, QrCodeIcon } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useClipboard } from "use-clipboard-copy";
import { Info } from "~components/common/info";
import { ErrorClient } from "~components/react-query/error-client";
import { Button } from "~components/ui/button";
import { GoogleIcon } from "~components/ui/icons";
import { Input } from "~components/ui/input";
import { Label } from "~components/ui/label";
import { RadioGroup, RadioGroupItem } from "~components/ui/radio";
import { Paragraph } from "~components/ui/typography";
import { tw } from "~lib/helpers";
import {
  withCustomSlugSchema,
  withoutCustomSlugSchema,
} from "~lib/utils/schema";
import { createNewUrl } from "~services";
import { isShowModalAtom } from "~store";

const QrCode = dynamic(() =>
  import("~components/shortener/qr-code").then((comp) => comp.QrCode)
);

const isGenerateQrCodeAtom = atom<boolean>(false);
const isCustomSlugAtom = atom<boolean>(true);
const radioDefaultValueAtom = atom<string>("option-custom");

type DataProps = {
  data: ShortenedUrlProps;
};

export function FormShortener({ session }: { session: Session | null }) {
  const [isCustomSlug, setIsCustomSlug] = useAtom(isCustomSlugAtom);
  const [isGenerateQrCode, setIsGenerateQrCode] = useAtom(isGenerateQrCodeAtom);
  const [isShowModal, setIsShowModal] = useAtom(isShowModalAtom);

  const clipboard = useClipboard({ copiedTimeout: 900 });

  const queryClient: QueryClient = useQueryClient();

  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isCustomSlug
      ? { original_url: "", custom_slug: "" }
      : { original_url: "" },
    resolver: zodResolver(
      isCustomSlug ? withCustomSlugSchema : withoutCustomSlugSchema
    ),
  });

  const createNewUrlMutation = useMutation({
    mutationFn: async () =>
      await createNewUrl({
        url: getValues("original_url"),
        custom_slug: getValues("custom_slug") as string,
        is_custom_slug: isCustomSlug,
      }),
    mutationKey: ["post-data"],
    onSuccess: async () => await queryClient.invalidateQueries(),
  });

  async function onSubmit() {
    await createNewUrlMutation.mutateAsync();
  }

  const detail = createNewUrlMutation.data as DataProps;

  if (createNewUrlMutation.isPending)
    return (
      <div className="w-full text-left mt-2 bg-gray-200 dark:bg-gray-700 rounded-md h-32 animate-pulse"></div>
    );
  if (createNewUrlMutation.isError) return <ErrorClient />;

  return (
    <div>
      {session ? (
        <>
          {/** Slug Options */}
          <Paragraph className="mt-2 font-bold">Choose slug options</Paragraph>
          <RadioGroup
            defaultValue={isCustomSlug ? "option-custom" : "option-random"}
            className="flex space-x-4 items-center mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-custom"
                onClick={() => setIsCustomSlug(true)}
                id="option-custom"
              />
              <Label htmlFor="option-custom" className="font-bold">
                Custom
              </Label>
              <Info size="sm">
                You can custom your slug, with any name!{" "}
                <span className="font-semibold">Limitation:</span> you can't
                input the name that already used, or it will produce error!
              </Info>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-random"
                onClick={() => setIsCustomSlug(false)}
                id="option-random"
              />
              <Label htmlFor="option-random" className="font-bold">
                Random
              </Label>
            </div>
          </RadioGroup>
          {/** Form */}
          <form
            className={tw("mt-4", isCustomSlug ? "space-y-3" : "")}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="flex justify-center items-center">
                <div className="px-3 py-2 rounded-l-md bg-slate-300 dark:bg-slate-800">
                  <Paragraph className="font-bold">Link</Paragraph>
                </div>
                <Input
                  {...register("original_url", { required: true })}
                  type="text"
                  name="original_url"
                />
              </div>
              {errors.original_url ? (
                <p className="mt-2 text-xs text-red-500">
                  {errors.original_url.message}{" "}
                </p>
              ) : null}
            </div>
            <div>
              {isCustomSlug ? (
                <>
                  <div className="flex justify-center items-center">
                    <div className="px-3 py-2 rounded-l-md bg-slate-300 dark:bg-slate-800">
                      <Paragraph className="font-bold">Slug</Paragraph>
                    </div>
                    <Input
                      {...register("custom_slug", { required: true })}
                      type="text"
                      name="custom_slug"
                    />
                  </div>
                  {errors.custom_slug ? (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.custom_slug.message}
                    </p>
                  ) : null}
                </>
              ) : null}
              <Button
                type="submit"
                aria-label="submit"
                className="mt-5 font-bold"
              >
                Submit
              </Button>
            </div>
          </form>
        </>
      ) : null}
      {!session ? (
        <>
          <Paragraph data-cy="sign-in-first" className="font-bold mt-3 mb-2">
            Sign In first to try
          </Paragraph>
          <div className="flex items-center space-x-3">
            <Button
              data-cy="sign-in-with-github-button"
              className="flex items-center space-x-2"
              type="button"
              aria-label="sign in with github"
              onClick={() => signIn("github")}
            >
              <span className="font-bold">Github</span>
              <GithubIcon />
            </Button>
            <Button
              data-cy="sign-in-with-google-button"
              variant="secondary"
              className="flex items-center space-x-2"
              type="button"
              aria-label="sign in with google"
              onClick={() => signIn("google")}
            >
              <span className="font-bold">Google</span>
              <GoogleIcon />
            </Button>
          </div>
        </>
      ) : null}
      {session ? (
        createNewUrlMutation.data ? (
          <>
            <div className="flex flex-col mt-3 justify-start items-start">
              <Paragraph>Result:</Paragraph>
              <Link
                href={detail.data.shortened_url}
                className="mt-4 underline underline-offset-2 font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://mijikai.space/{detail.data.shortened_url}
              </Link>
              <div className="flex items-center space-x-2 mt-3">
                <Button
                  data-cy="copy-to-clipboard-button"
                  type="button"
                  aria-label="copy to clipboard"
                  className="space-x-2.5 font-bold"
                  onClick={() =>
                    clipboard.copy(
                      `https://mijikai.space/${detail.data.shortened_url}`
                    )
                  }
                >
                  {clipboard.copied ? (
                    <>
                      <span>Copied!</span>
                      <CopyCheckIcon />
                    </>
                  ) : (
                    <>
                      <span>Copy</span>
                      <CopyIcon />
                    </>
                  )}
                </Button>
                <Button
                  data-cy="generate-qr-code-button"
                  type="button"
                  aria-label="generate qr code"
                  onClick={() => {
                    setIsGenerateQrCode(true);
                    setIsShowModal(true);
                  }}
                  className="space-x-2.5 font-bold"
                >
                  <span>Generate QR Code</span>
                  <QrCodeIcon />
                </Button>
              </div>
              <Link
                href="/users-link-list"
                className="font-bold underline underline-offset-2 mt-3"
              >
                <Paragraph>See your link list</Paragraph>
              </Link>
            </div>
            {isGenerateQrCode && isShowModal ? (
              <QrCode url={detail.data.shortened_url} />
            ) : null}
          </>
        ) : null
      ) : null}
    </div>
  );
}
