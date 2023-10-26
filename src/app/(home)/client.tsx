"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import {
  CopyCheckIcon,
  CopyIcon,
  GithubIcon,
  InfoIcon,
  QrCodeIcon,
} from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useClipboard } from "use-clipboard-copy";
import { Button } from "~components/ui/button";
import { GoogleIcon } from "~components/ui/icons";
import { Input } from "~components/ui/input";
import { Label } from "~components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~components/ui/popover";
import { RadioGroup, RadioGroupItem } from "~components/ui/radio";
import { Paragraph } from "~components/ui/typography";
import { tw } from "~lib/helpers";
import { postData } from "~lib/utils/axios-config";
import {
  withCustomSlugSchema,
  withoutCustomSlugSchema,
} from "~lib/utils/schema";
import { isShowModalAtom } from "~store";
import { ShortenedUrlProps } from "~types";

import ErrorClient from "./error-client";
import LoadingClient from "./loading-client";

const QrCode = dynamic(() => import("~components/qr-code"));

const isGenerateQrCodeAtom = atom<boolean>(false);
const isCustomSlugAtom = atom<boolean>(true);

type DataProps = {
  data: ShortenedUrlProps;
};

export default function HomeClient({ session }: { session: Session | null }) {
  const [isCustomSlug, setIsCustomSlug] = useAtom(isCustomSlugAtom);
  const [isGenerateQrCode, setIsGenerateQrCode] = useAtom(isGenerateQrCodeAtom);
  const [isShowModal, setIsShowModal] = useAtom(isShowModalAtom);

  const clipboard = useClipboard({ copiedTimeout: 900 });

  const queryClient: QueryClient = useQueryClient();

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { original_url: "", custom_slug: "" },
    resolver: zodResolver(
      isCustomSlug ? withCustomSlugSchema : withoutCustomSlugSchema
    ),
  });

  const { data, isPending, isError, mutate } = useMutation({
    mutationFn: postData,
    mutationKey: ["postData"],
    onSuccess: () => queryClient.invalidateQueries(),
  });

  function onSubmit() {
    // submit custom slug or random slug
    mutate({
      url: getValues("original_url"),
      custom_slug: getValues("custom_slug"),
      is_custom_slug: isCustomSlug,
    });
  }

  const detail = data as DataProps;

  if (isPending) return <LoadingClient />;
  if (isError) return <ErrorClient />;

  return (
    <div>
      {session ? (
        <>
          <Paragraph className="mt-2 font-bold">Choose slug options</Paragraph>
          <RadioGroup
            defaultValue="option-custom"
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
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" aria-label="info icon button">
                    <InfoIcon size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <Paragraph className="font-medium">
                    You can custom your slug, with any name!{" "}
                    <span className="font-bold">Limitation:</span> you can't
                    input the name that already used, or it will produce error!
                  </Paragraph>
                </PopoverContent>
              </Popover>
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
          <form
            className={tw("mt-4", isCustomSlug ? "space-y-3" : "")}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="flex justify-center items-center">
                <div className="px-3 py-2 rounded-l-md bg-gray-300">
                  <Paragraph className="font-bold">Link</Paragraph>
                </div>
                <Input
                  {...register("original_url", { required: true })}
                  type="text"
                  name="original_url"
                />
              </div>
              {errors.original_url ? (
                <p className="mt-2 font-semibold">
                  {errors.original_url.message}{" "}
                </p>
              ) : null}
            </div>
            {isCustomSlug ? (
              <div>
                <div className="flex justify-center items-center">
                  <div className="px-3 py-2 rounded-l-md bg-gray-300">
                    <Paragraph className="font-bold">Slug</Paragraph>
                  </div>
                  <Input
                    {...register("custom_slug", { required: true })}
                    type="text"
                    name="custom_slug"
                  />
                </div>
                {errors.custom_slug ? (
                  <p className="mt-2 font-semibold">
                    {errors.custom_slug.message}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  aria-label="submit"
                  className="mt-5 font-bold"
                >
                  Submit
                </Button>
              </div>
            ) : null}
          </form>
        </>
      ) : null}
      {!session ? (
        <>
          <Paragraph className="font-bold mt-3 mb-2">
            Sign In first to try
          </Paragraph>
          <div className="flex items-center space-x-3">
            <Button
              className="flex items-center space-x-2"
              type="button"
              aria-label="sign in with github"
              onClick={() => signIn("github")}
            >
              <span className="font-bold">Github</span>
              <GithubIcon />
            </Button>
            <Button
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
        data ? (
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
              <QrCode url={detail.data.original_url} />
            ) : null}
          </>
        ) : null
      ) : null}
    </div>
  );
}

export function SignOut() {
  return (
    <button
      className="font-bold underline underline-offset-2"
      type="button"
      aria-label="sign out"
      onClick={() => signOut()}
    >
      Click here.
    </button>
  );
}
