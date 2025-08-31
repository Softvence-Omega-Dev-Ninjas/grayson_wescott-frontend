"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Carbon Engines Branding */}
      <div className="flex-1  relative overflow-hidden hidden md:block"
      style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
          }}>
        {/* Textured background pattern */}
        <div
          className="absolute inset-0 opacity-20"
          
        />

        {/* Logo */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2">
         
          <Image src={bg1.src} alt="logo" width={600} height={600}/>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 bg-[#252525] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Log in</h1>
            <p className="text-gray-300 mb-1">Welcome back! 👋</p>
            <p className="text-gray-400 text-sm">
              Please sign in to your account and start the adventure
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      className="mt-1 bg-[#1E1E1E] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      {...field}
                    />
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

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
                        type="password"
                        placeholder="••••••••••••"
                        className="bg-[#1E1E1E] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 pr-10"
                        {...field}
                      />
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

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-gray-600"
                      />
                      <FormLabel className="text-gray-400 text-sm">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <a
                  href="/forgetpassword"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-100 font-medium py-3"
              >
                <Link href={'/twostepverification'}>Sign In</Link>
              </Button>

              <div className="text-center">
                <span className="text-gray-400 text-sm">
                  New on our platform?{" "}
                </span>
                <a
                  href="/register"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  Create an account
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center space-x-4 pt-4">
                <button className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700">
                  <span className="text-white text-sm font-bold">f</span>
                </button>
                <button className="w-10 h-10 bg-blue-400 rounded flex items-center justify-center hover:bg-blue-500">
                  <span className="text-white text-sm font-bold">t</span>
                </button>
                <button className="w-10 h-10 bg-red-500 rounded flex items-center justify-center hover:bg-red-600">
                  <span className="text-white text-sm font-bold">G</span>
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
