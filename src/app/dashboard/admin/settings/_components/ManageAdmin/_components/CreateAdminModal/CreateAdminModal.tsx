// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { Eye, EyeOff, Loader2, Plus } from 'lucide-react';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

// import { Button } from '@/components/ui/button';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { createAdmin } from '@/services/admin/manage-admin';
// import { toast } from 'sonner';

// // ✅ Validation schema
// const createAdminSchema = z.object({
//   name: z
//     .string()
//     .min(2, 'Name must be at least 2 characters long')
//     .max(50, 'Name must be under 50 characters'),
//   email: z.string().email('Please enter a valid email address'),
//   password: z.string().min(8, 'Password must be at least 8 characters'),
// });

// type TAdminForm = z.infer<typeof createAdminSchema>;

// const CreateAdminModal = () => {
//   const [open, setOpen] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const form = useForm<TAdminForm>({
//     resolver: zodResolver(createAdminSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = async (data: TAdminForm) => {
//     setUploading(true);
//     try {
//       const res = await createAdmin(data);

//       if (res?.success) {
//         toast.success('Admin created successfully!');
//         form.reset();
//         setOpen(false);
//       } else {
//         toast.error(res?.message || 'Failed to create admin.');
//       }
//     } catch (err) {
//       console.error('❌ Error creating admin:', err);
//       toast.error('Something went wrong. Please try again later.');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="w-fit bg-secondary border border-primary-200 text-white cursor-pointer">
//           <Plus className="h-4 w-4 mr-2" />
//           Add Admin
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-md p-0 overflow-hidden bg-primary-100 border border-secondary">
//         <div className="p-6 overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold font-Aclonica">
//               Add New Admin
//             </DialogTitle>
//           </DialogHeader>

//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-5 mt-4"
//             >
//               {/* 🧍‍♂️ Name Field */}
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Full Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         className="bg-primary-200 mt-2"
//                         placeholder="Enter full name"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* 📧 Email Field */}
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email Address</FormLabel>
//                     <FormControl>
//                       <Input
//                         className="bg-primary-200 mt-2"
//                         placeholder="Enter email address"
//                         type="email"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* 🔒 Password Field with Toggle */}
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <div className="relative mt-2">
//                         <Input
//                           className="bg-primary-200 pr-10"
//                           placeholder="Enter strong password"
//                           type={showPassword ? 'text' : 'password'}
//                           {...field}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword((prev) => !prev)}
//                           className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
//                         >
//                           {showPassword ? (
//                             <EyeOff className="w-5 h-5" />
//                           ) : (
//                             <Eye className="w-5 h-5" />
//                           )}
//                         </button>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 className="w-full mt-6 bg-secondary border border-primary-200 hover:bg-secondary/80 cursor-pointer"
//                 disabled={uploading}
//               >
//                 {uploading ? (
//                   <div className="flex items-center gap-2">
//                     <Loader2 className="animate-spin" />
//                     Creating Admin...
//                   </div>
//                 ) : (
//                   'Add Admin'
//                 )}
//               </Button>
//             </form>
//           </Form>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateAdminModal;

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Plus } from 'lucide-react';
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
import { createAdmin } from '@/services/admin/manage-admin';
import { toast } from 'sonner';

// ✅ Validation schema
const createAdminSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be under 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type TAdminForm = z.infer<typeof createAdminSchema>;

type CreateAdminModalProps = {
  onAdminCreated?: () => void; // ✅ Callback from parent
};

const CreateAdminModal = ({ onAdminCreated }: CreateAdminModalProps) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<TAdminForm>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TAdminForm) => {
    setUploading(true);
    try {
      const res = await createAdmin(data);

      if (res?.success) {
        toast.success('Admin created successfully!');
        form.reset();
        setOpen(false);

        // ✅ Trigger re-fetch in parent component
        onAdminCreated?.();
      } else {
        toast.error(res?.message || 'Failed to create admin.');
      }
    } catch (err) {
      console.error('❌ Error creating admin:', err);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit bg-secondary border border-primary-200 text-white cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Add Admin
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-0 overflow-hidden bg-primary-100 border border-secondary">
        <div className="p-6 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-Aclonica">
              Add New Admin
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 mt-4"
            >
              {/* 🧍‍♂️ Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-primary-200 mt-2"
                        placeholder="Enter full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 📧 Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-primary-200 mt-2"
                        placeholder="Enter email address"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 🔒 Password Field with Toggle */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative mt-2">
                        <Input
                          className="bg-primary-200 pr-10"
                          placeholder="Enter strong password"
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-6 bg-secondary border border-primary-200 hover:bg-secondary/80 cursor-pointer"
                disabled={uploading}
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    Creating Admin...
                  </div>
                ) : (
                  'Add Admin'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdminModal;
