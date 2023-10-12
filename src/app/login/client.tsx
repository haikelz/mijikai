"use client";

import { atom, useAtom } from "jotai";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "~components/ui/card";
import { Input } from "~components/ui/input";
import { Heading } from "~components/ui/typography";

const isShowPasswordAtom = atom<boolean>(false);

export default function LoginClient() {
  const [isShowPassword, setIsShowPassword] = useAtom(isShowPasswordAtom);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <Heading as="h3">Sign In</Heading>
      </CardHeader>
      <CardContent>
        <div>
          <Input type="text" placeholder="Username...." />
        </div>
        <div className="flex relative items-center mt-2">
          <Input
            className="pr-12"
            type={isShowPassword ? "text" : "password"}
            placeholder="Password...."
          />
          {isShowPassword ? (
            <EyeIcon
              className="absolute right-3 cursor-pointer"
              onClick={() => setIsShowPassword(false)}
            />
          ) : (
            <EyeOffIcon
              className="absolute right-3 cursor-pointer"
              onClick={() => setIsShowPassword(true)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
