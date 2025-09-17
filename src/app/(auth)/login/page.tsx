"use client";
import { useState } from "react";
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
import bg from "../../../assets/footerbg.png";
import bg1 from "../../../assets/header/logo.png";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaFacebookF, FaSpinner, FaTwitter } from "react-icons/fa6";
import { loginUser } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import GoogleLogin from "./_components/GoogleLogin/GoogleLogin";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setIsLoading } = useUser();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await loginUser(values);
      if (res?.success) {
        toast.success("Login successful!");
        setUser(res?.data?.user);
        setIsLoading(false);
        if (res?.data?.user?.role === "USER") {
          router.push(`/dashboard/user/overview`);
        }
        if (res?.data?.user?.role === "ADMIN") {
          router.push(`/dashboard/admin/overview`);
        }
      } else {
        toast.error(res?.message || "Login failed. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again in a moment.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className="flex-1 relative overflow-hidden hidden md:block"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute left-12 top-1/2 -translate-y-1/2">
          <Image src={bg1.src} alt="logo" width={600} height={600} />
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 bg-[#252525] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Log in</h1>
            <p className="text-gray-200 text-xl font-semibold mb-1">
              Welcome back! 👋
            </p>
            <p className="text-gray-400 text-sm">
              Please sign in to your account and start the adventure
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm">
                      Email
                    </FormLabel>
                    <Input
                      type="email"
                      placeholder="test@gmail.com"
                      className="mt-1 bg-primary-100 focus:border-gray-600 text-white placeholder:text-gray-200"
                      {...field}
                    />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm">
                      Password
                    </FormLabel>
                    <div className="relative mt-1">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        className="bg-primary-100 focus:border-gray-600 text-white placeholder:text-gray-200 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible size={20} />
                        ) : (
                          <AiOutlineEye size={20} />
                        )}
                      </button>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Forgot password */}
              <div className="flex items-center justify-between">
                <Link
                  href="/forgetpassword"
                  className="text-white hover:text-white/85 font-medium text-sm"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-100 font-medium py-3 cursor-pointer"
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Register Link */}
              <div className="text-center">
                <span className="text-gray-400 text-sm">
                  New on our platform?{" "}
                </span>
                <a
                  href="/register"
                  className="text-white hover:text-white/85 font-medium text-base"
                >
                  Create an account
                </a>
              </div>
            </form>
            {/* Social Buttons */}
            <div className="flex justify-center space-x-4 pt-4">
              <button className="w-9 h-9 bg-white rounded flex items-center justify-center cursor-pointer mt-0.5">
                <FaFacebookF className="text-blue-500" />
              </button>
              <button className="w-9 h-9 bg-white rounded flex items-center justify-center cursor-pointer mt-0.5">
                <FaTwitter className="text-sky-400" />
              </button>
              <GoogleLogin />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
