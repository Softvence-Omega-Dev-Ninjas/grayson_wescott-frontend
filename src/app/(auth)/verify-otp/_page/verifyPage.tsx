'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { resendVerificationEmail, verifyEmail } from '@/services/auth';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import { toast } from 'sonner';
import bg from '../../../../assets/footerbg.png';
import bg1 from '../../../../assets/header/logo.png';

export default function TwoStepVerificationPage() {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    setEmail(searchParams.get('email'));
  }, [searchParams]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);

      // Clear error when typing
      if (error) setError('');

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = codes.join('');

    const verificationData = {
      otp: otp,
      email: email,
    };

    if (otp.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await verifyEmail(verificationData);
      if (res?.success) {
        toast.success(
          'Your email has been verified successfully! You can now log in.',
        );
        router.push(`/login`);
      } else {
        toast.error(
          res?.message ||
            'Verification failed. Please double-check your code and try again.',
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        'Oops! Something went wrong on our end. Please try again shortly.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendEmail = async () => {
    setIsSendingOtp(true);
    try {
      const res = await resendVerificationEmail({ email: email });
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(
          res?.message || 'Failed Send request! Please try again later.',
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        'Oops! Something went wrong on our end. Please try again shortly.',
      );
    } finally {
      setIsSendingOtp(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
      <div
        className="flex-1 relative overflow-hidden hidden md:block"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 opacity-20" />
        <div className="absolute left-12 top-1/2 -translate-y-1/2">
          <Image src={bg1.src} alt="logo" width={600} height={600} />
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-[#252525] flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
              Verify
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
              We sent a verification code to your email. Enter the code below.
              <br />
              <span className="text-white font-medium">{email}</span>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                Type your 6 digit security code
              </p>
              <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                {codes.map((code, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    value={code}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-white bg-[#252525] border-gray-600 focus:border-blue-500 text-lg font-semibold"
                    maxLength={1}
                  />
                ))}
              </div>
              {error && (
                <p className="text-red-500 text-xs sm:text-sm text-center">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-100 font-medium py-2 sm:py-3 cursor-pointer"
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin" />
              ) : (
                'Verify Now'
              )}
            </Button>

            <div className="text-center">
              <div className="text-gray-400 text-xs sm:text-sm">
                Didn’t get the mail?{' '}
                <button
                  type="button"
                  onClick={resendEmail}
                  className="text-white font-semibold hover:text-white/75 underline cursor-pointer"
                >
                  {isSendingOtp ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    'Resend'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
