"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import bg from '../../../assets/footerbg.png'
import bg1 from '../../../assets/header/logo.png'
import Image from "next/image"

// Corrected the schema by removing the .default() method.
// This resolves the type mismatch with the useForm's defaultValues.
const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean(),
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      remember: false,
    },
  })

  const onSubmit = (values: SignUpFormValues) => {
    // The router has been removed for environment compatibility.
    // The form now simply logs the submitted values.
    console.log("[v0] Sign up form submitted:", values)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Carbon Engines Branding */}
      <div className="flex-1  relative overflow-hidden"
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

      {/* Right Panel - Sign Up Form */}
      <div className="flex-1 bg-[#252525] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sign Up</h1>
            <p className="text-gray-300 mb-1">Welcome to Back! 👋</p>
            <p className="text-gray-400 text-sm">Please sign up to your account and start the adventure</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm">Username</FormLabel>
                    <div className="relative mt-1">
                      <Input
                        type="text"
                        placeholder="johndoe"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 pl-10"
                        {...field}
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</div>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm">Email</FormLabel>
                    <div className="relative mt-1">
                      <Input
                        type="email"
                        placeholder="test@gmail.com"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 pl-10"
                        {...field}
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉</div>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm">Password</FormLabel>
                    <div className="relative mt-1">
                      <Input
                        type="password"
                        placeholder="••••••••••••"
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 pl-10 pr-10"
                        {...field}
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</div>
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
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-gray-600" />
                      <FormLabel className="text-gray-400 text-sm">Remember Me</FormLabel>
                    </FormItem>
                  )}
                />
                <Link href="/forgetpassword" className="text-blue-400 hover:text-blue-300 text-sm">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100 font-medium py-3">
                Sign Up
              </Button>

              <div className="text-center">
                <span className="text-gray-400 text-sm">New on our platform? </span>
                <Link href="/login" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Back to Login
                </Link>
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
  )
}
