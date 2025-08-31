"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import bg from '../../../assets/footerbg.png'
import bg1 from '../../../assets/header/logo.png'
import Image from "next/image"
export default function TwoStepVerificationPage() {
  const [codes, setCodes] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCodes = [...codes]
      newCodes[index] = value
      setCodes(newCodes)

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard/user/overview")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Carbon Engines Branding */}
      <div className="flex-1 bg-black relative overflow-hidden"
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

      {/* Right Panel - Two-Step Verification Form */}
      <div className="flex-1 bg-[#252525] flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-6">Two-Step Verification</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              We sent a verification code to your mobile. Enter the code from the
              <br />
              mobile in the field below.
              <br />
              <span className="text-white">******1234</span>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <p className="text-gray-300 text-sm mb-4">Type your 6 digit security code</p>
              <div className="flex justify-center gap-3 mb-6">
                {codes.map((code, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    value={code}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-white bg-[#252525] border-gray-600 focus:border-blue-500 text-lg font-semibold"
                    maxLength={1}
                  />
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100 font-medium py-3">
              Verify Now
            </Button>

            <div className="text-center">
              <div className="text-gray-400 text-sm">
                Didnt get the mail?{" "}
                <button type="button" className="text-blue-400 hover:text-blue-300 underline">
                  Resend
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}