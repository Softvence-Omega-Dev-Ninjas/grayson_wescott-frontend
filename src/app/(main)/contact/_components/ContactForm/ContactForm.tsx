/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import CTA from "@/components/shared/main/CTA/CTA";
import contactImg from "@/assets/about/contactSideBg.jpg";

const MapComponent = dynamic(() => import("@/app/(main)/contact/_components/MapContact/MapContact"), { ssr: false });

const ContactForm = () => {
  const [formData, setFormData] = useState({
    contactName: "",
    street: "",
    city: "",
    postcode: "",
    contactPhone: "",
    email: "",
    message: "",
    protectData: false,
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Form */}
          <div className="space-y-8">
            <h1 className="text-3xl lg:text-4xl font-light mb-8">Get in touch</h1>
            <div className="space-y-6">
              {/* Form fields */}
              {/* Left Column - Form */}
              <div className="space-y-8">
                <h1 className="text-3xl lg:text-4xl font-light mb-8">Get in touch</h1>

                <div className="space-y-6">
                  {/* Contact Name */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Contact name</label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-600 py-2 px-0 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Street */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Street</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-600 py-2 px-0 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* City and Postcode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-gray-600 py-2 px-0 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Postcode</label>
                      <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-gray-600 py-2 px-0 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-600 py-2 px-0 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-gray-600 py-2 px-0 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Let&apos;s talk about your engine</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-transparent border-b border-gray-600 py-2 px-0 text-white placeholder-gray-500 focus:border-white focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <div className="text-gray-400 mb-2">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400">Upload Additional file</p>
                    <p className="text-xs text-gray-500 mt-1">Max file size: PDF, Document about 10 pages</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" id="file-upload" />
                    <label htmlFor="file-upload" className="cursor-pointer inline-block w-full h-full" />
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="protectData"
                      checked={formData.protectData}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-white bg-transparent border border-gray-600 rounded focus:ring-white focus:ring-2"
                      required
                    />
                    <label className="text-sm text-gray-300 leading-5">I want to protect my data</label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-[#B9BDC6] hover:bg-[#B9BDC6]/80 text-black py-3 px-6 font-semibold transition-colors duration-200 tracking-wide cursor-pointer"
                  >
                    SEND TO THE ENGINEER
                  </button>
                </div>
              </div>
              {/* ... (all your existing input and form elements) */}
            </div>
          </div>
          {/* Right Column - Contact Info and Map */}
          <div className="space-y-8">
            <div className="bg-primary-200 p-6 lg:p-8">
              <h2 className="text-xl font-light mb-6">Contact</h2>
              <p className="text-gray-300 mb-8">250B, West Site House Main Town, New York</p>
              {/* Map Container - now using the dynamically imported component */}
              <div className="h-64 lg:h-[500px] overflow-hidden -z-20">
                <MapComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-28 space-y-10">
        <CTA title="READY TO BUILD THE UNBREAKABLE?" img={contactImg.src} btn1="START YOUR BUILD" />
      </div>
    </div>
  );
};

export default ContactForm;
