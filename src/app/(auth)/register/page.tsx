'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { RiUserLine } from 'react-icons/ri';
import { toast } from 'sonner';
import * as z from 'zod';
import bg from '../../../assets/footerbg.png';
import bg1 from '../../../assets/header/logo.png';
import GoogleLogin from '../login/_components/GoogleLogin/GoogleLogin';
import TwitterLogin from '../login/_components/TwitterLogin/TwitterLogin';

import dynamic from 'next/dynamic';

// Lazy-load FB login to avoid SSR
const FacebookLogin = dynamic(
  () => import('../login/_components/FacebookLogin/FacebookLogin'),
  {
    ssr: false,
  },
);

// Corrected the schema by removing the .default() method.
// This resolves the type mismatch with the useForm's defaultValues.
const signUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: SignUpFormValues) => {
    // The router has been removed for environment compatibility.
    // The form now simply logs the submitted values.
    console.log('[v0] Sign up form submitted:', values);
    try {
      const res = await registerUser(values);
      console.log('==============>', res);
      if (res?.success) {
        toast.success(
          'Registration successful! We’ve sent a verification code to your email.',
        );
        router.push(`/verify-otp?email=${values.email}`);
      } else {
        toast.error(
          res?.message || 'Registration failed. Please try again later.',
        );
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again in a moment.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Carbon Engines Branding */}
      <div
        className="flex-1  relative overflow-hidden hidden md:block"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: 'cover',
        }}
      >
        {/* Textured background pattern */}
        <div className="absolute inset-0 opacity-20" />

        {/* Logo */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2">
          <Image src={bg1.src} alt="logo" width={600} height={600} />
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="flex-1 bg-[#252525] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sign Up</h1>
            <p className="text-gray-200 text-xl font-semibold mb-1">
              Welcome back! 👋
            </p>
            <p className="text-gray-400 text-sm">
              Please sign up to your account and start the adventure
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 text-sm">
                      Username
                    </FormLabel>
                    <div className="relative mt-1">
                      <Input
                        type="text"
                        placeholder="johndoe"
                        className="bg-primary-100 focus:border-gray-600 text-white placeholder:text-gray-200  pl-10"
                        {...field}
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 ">
                        <RiUserLine className="text-gray-200" />
                      </div>
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
                    <FormLabel className="text-gray-300 text-sm">
                      Email
                    </FormLabel>
                    <div className="relative mt-1">
                      <Input
                        type="email"
                        placeholder="test@gmail.com"
                        className="bg-primary-100 focus:border-gray-600 text-white placeholder:text-gray-200 pl-10"
                        {...field}
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 ">
                        <MdOutlineEmail className="text-gray-200" />
                      </div>
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
                    <FormLabel className="text-gray-300 text-sm">
                      Password
                    </FormLabel>
                    <div className="relative mt-1">
                      <Input
                        type={showPassword ? 'text' : 'password'}
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

              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-100 font-medium py-3 cursor-pointer"
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  'Sign Up'
                )}
              </Button>

              <div className="text-center">
                <span className="text-gray-400 text-sm">
                  Already have an account?{' '}
                </span>
                <Link
                  href="/login"
                  className="text-white text-base font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </Form>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 pt-4">
            <FacebookLogin />
            <TwitterLogin />
            <GoogleLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
