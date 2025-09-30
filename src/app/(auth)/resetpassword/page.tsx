"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    console.log("[v0] Reset password form submitted:", values);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Carbon Engines Branding */}
      <div className="flex-1 bg-black relative overflow-hidden">
        {/* Textured background pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Logo */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2">
          <div className="text-white">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 bg-white flex items-center justify-center">
                <div className="text-black font-bold text-2xl">CE</div>
              </div>
              <div>
                <div className="text-4xl font-bold tracking-wider">CARBON</div>
                <div className="text-4xl font-bold tracking-wider">ENGINES</div>
              </div>
            </div>
            <div className="text-sm tracking-widest text-gray-300 ml-20">
              ENGINEERED FOR STRENGTH
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Reset Password Form */}
      <div className="flex-1 bg-gray-800 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Reset password
            </h1>
            <p className="text-gray-400 text-sm">For example@info@mail.com</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm">
                      New Password
                    </FormLabel>
                    <div className="relative mt-1">
                      <Input
                        type="password"
                        placeholder="••••••••••••"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 pl-10 pr-10"
                        {...field}
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        🔒
                      </div>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        👁
                      </button>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm">
                      Confirm Password
                    </FormLabel>
                    <div className="relative mt-1">
                      <Input
                        type="password"
                        placeholder="••••••••••••"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 pl-10 pr-10"
                        {...field}
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        🔒
                      </div>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        👁
                      </button>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-100 font-medium py-3"
              >
                Set New Password
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center justify-center gap-2"
                >
                  <span>←</span>
                  Back To Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
