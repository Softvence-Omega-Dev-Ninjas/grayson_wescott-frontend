 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { FileUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

// Define the schema for form validation using Zod
const formSchema = z.object({
  contactName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  street: z.string().min(1, {
    message: 'Street is required.',
  }),
  city: z.string().min(1, {
    message: 'City is required.',
  }),
  postcode: z.string().min(4, {
    message: 'Postcode must be at least 4 characters.',
  }),
  contactPhone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  engineDetails: z.string().optional(),
  file: z.any().optional(), // File validation can be more complex
  protectData: z.boolean().default(false).optional(),
});

// Main App component containing the complete contact form
export default function FormSection()  {
  // Use the useForm hook with Zod resolver for validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactName: '',
      street: '',
      city: '',
      postcode: '',
      contactPhone: '',
      email: '',
      engineDetails: '',
      protectData: false,
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    // This is where you would handle the form data, e.g., send it to an API
    console.log(values);
    // You can add a success message here if needed
  }

  // State and handlers for file drag and drop
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const fileRef = form.register('file');

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      form.setValue('file', e.dataTransfer.files);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-200 p-8 md:p-12 lg:p-24 flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Name Input */}
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full bg-transparent border-b border-gray-500 focus:border-white focus:outline-none py-2 transition-colors duration-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Street Input */}
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full bg-transparent border-b border-gray-500 focus:border-white focus:outline-none py-2 transition-colors duration-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City and Postcode Inputs in a responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full bg-transparent border-b border-gray-500 focus:border-white focus:outline-none py-2 transition-colors duration-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postcode</FormLabel>
                    <FormControl>
                      <Input {...field} className="w-full bg-transparent border-b border-gray-500 focus:border-white focus:outline-none py-2 transition-colors duration-300" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Phone Input */}
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} className="w-full bg-transparent border-b border-gray-500 focus:border-white focus:outline-none py-2 transition-colors duration-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* E-mail Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="w-full bg-transparent border-b border-gray-500 focus:border-white focus:outline-none py-2 transition-colors duration-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Engine Details Textarea */}
            <FormField
              control={form.control}
              name="engineDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lets talk about your engine</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="w-full bg-transparent border-b border-gray-500 focus:border-white focus:outline-none py-2 transition-colors duration-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
                isDragActive ? 'border-white text-white' : 'border-gray-500 text-gray-400'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Input
                id="file-upload"
                type="file"
                {...fileRef}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                <FileUp size={24} className="mx-auto mb-2" />
                <span>{form.watch('file')?.[0]?.name || 'Upload Additional file'}</span>
              </label>
              <p className="text-xs text-gray-600 mt-2">
                Attach file. File size of your documents should not exceed 10MB
              </p>
            </div>

            {/* Checkbox for Data Protection */}
            <FormField
              control={form.control}
              name="protectData"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0 pt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="form-checkbox h-4 w-4 text-white bg-transparent rounded border-gray-500 focus:ring-0 focus:ring-offset-0"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I want to protect my data
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-4 bg-gray-600 text-white uppercase font-bold rounded-lg hover:bg-gray-500 transition-colors duration-300 mt-6"
            >
              Send to the engineer
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
