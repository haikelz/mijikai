"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~components/ui/button";
import { Input } from "~components/ui/input";
import { Label } from "~components/ui/label";
import { loginAdminSchema } from "~lib/utils/schema";
import { loginAdmin } from "~services";

export default function LoginAdmin() {
  const queryClient = useQueryClient();

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
      toast(data.message);

      setTimeout(() => {
        router.push("/dashboard/admin");
      }, 1000);
    },
    onError: (data: any) => {
      toast(data.response.data.message);
    },
  });

  async function onSubmit() {
    await loginAdminMutation.mutateAsync();
  }

  return (
    <main className="min-h-svh flex justify-center items-center w-full mx-auto">
      <section className="min-h-svh flex justify-center items-center p-4 w-full max-w-xl">
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
              <Input
                {...register("password")}
                className="w-full mt-1"
                type="password"
              />
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
      </section>
    </main>
  );
}
