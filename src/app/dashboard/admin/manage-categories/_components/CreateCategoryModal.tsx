'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { createCategory } from '@/services/admin/category';

const createCategoryValidationSchema = z.object({
  name: z
    .string()
    .min(2, 'Category name must be at least 2 characters long')
    .max(50, 'Category name must be under 50 characters'),
  description: z
    .string()
    .min(5, 'Description must be at least 5 characters long')
    .max(200, 'Description must be under 200 characters'),
});

type TFormValues = z.infer<typeof createCategoryValidationSchema>;

const CreateCategoryModal = () => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const form = useForm<TFormValues>({
    resolver: zodResolver(createCategoryValidationSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (data: TFormValues) => {
    setUploading(true);
    try {
      // Example API call
      const res = await createCategory(data);
      console.log(res);

      form.reset();
      setOpen(false);
    } catch (err) {
      console.error('❌ Error submitting category:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit bg-secondary border border-primary-200 text-white cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-0 overflow-hidden bg-primary-100 border border-secondary">
        <div className="p-6 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-Aclonica">
              Add New Category
            </DialogTitle>
          </DialogHeader>

          {/* ✅ shadcn Form wrapper */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 mt-4"
            >
              {/* Category Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-primary-200 mt-2"
                        placeholder="Enter category name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-primary-200 rounded-none mt-2"
                        placeholder="Enter category description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-6 bg-secondary border border-primary-200 hover:bg-secondary/80 cursor-pointer"
                disabled={uploading}
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    Adding Category...
                  </div>
                ) : (
                  'Add Category'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
