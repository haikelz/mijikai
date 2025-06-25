"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~components/ui/button";
import { Input } from "~components/ui/input";
import { Label } from "~components/ui/label";
import { loginAdminSchema } from "~lib/utils/schema";
import { loginAdmin } from "~services/admin";

export default function FormLoginAdmin() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginAdminSchema),
  });

  const loginAdminMutation = useMutation({
    mutationFn: async () =>
      await loginAdmin(getValues("email"), getValues("password")),
    mutationKey: ["login-admin"],
    onSuccess: async (data) => {
      setTimeout(() => {
        router.push("/dashboard/admin");
      }, 1000);

      toast.success(data.message, { closeButton: true });
    },
    onError: (data: any) => {
      toast.error(data.response.data.message, { closeButton: true });
    },
  });

  async function onSubmit() {
    await loginAdminMutation.mutateAsync();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="font-bold text-2xl text-center">Login as Admin</h3>
      <div className="space-y-6 w-full mt-6">
        <div className="w-full">
          <Label htmlFor="email">Email</Label>
          <Input {...register("email")} className="w-full mt-1" />
          {errors.email ? (
            <span className="mt-1 text-red-500 font-semibold text-xs">
              {errors.email.message}
            </span>
          ) : null}
        </div>
        <div className="w-full">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              {...register("password")}
              className="w-full mt-1"
              type={isShowPassword ? "text" : "password"}
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <EyeOff size={21} /> : <Eye size={21} />}
            </button>
          </div>
          {errors.password ? (
            <span className="mt-1 text-red-500 font-semibold text-xs">
              {errors.password.message}
            </span>
          ) : null}
        </div>
        <Button
          className="w-full font-bold"
          type="submit"
          disabled={loginAdminMutation.isPending}
        >
          {loginAdminMutation.isPending ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </form>
  );
}
