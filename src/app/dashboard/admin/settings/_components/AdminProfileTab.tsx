// 'use client';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import useUser from '@/hooks/useUser';
// import { updateUser } from '@/services/auth';
// import { User, X } from 'lucide-react';
// import { toast } from 'sonner';
// import a1 from '../../../../../assets/dashboard/admin/profile/avatar.png';

// const profileSchema = z.object({
//   fullname: z
//     .string()
//     .min(2, 'Full name must be at least 2 characters')
//     .optional(),
//   email: z.string().email('Invalid email address').optional(),
//   photo: z
//     .any()
//     .optional()
//     .refine((file) => !file || file instanceof File, {
//       message: 'Photo must be a valid file',
//     }),
// });

// type ProfileFormData = z.infer<typeof profileSchema>;

// const AdminProfileTab = () => {
//   const { user, setUser } = useUser();

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [photoChanged, setPhotoChanged] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     watch,
//     formState: { errors, isDirty },
//   } = useForm<ProfileFormData>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       fullname: '',
//       email: '',
//     },
//   });

//   // ✅ Reset when user data loads
//   useEffect(() => {
//     if (user) {
//       reset({
//         fullname: user.name || '',
//         email: user.email || '',
//       });
//       setPreviewUrl(user.avatarUrl || a1.src);
//       setPhotoChanged(false);
//       setSelectedFile(null);
//     }
//   }, [user, reset]);

//   // 📸 Handle image upload
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//       setValue('photo', file);
//       setPhotoChanged(true);
//     }
//   };

//   // ❌ Remove selected image
//   const handleRemoveImage = () => {
//     setSelectedFile(null);
//     setPreviewUrl(user?.avatarUrl || a1.src);
//     setValue('photo', undefined);
//     setPhotoChanged(false);
//   };

//   // 🧾 Form submit
//   const onSubmit = async (data: ProfileFormData) => {
//     // Ensure we have a loaded user before attempting to update
//     if (!user?.id) {
//       // Optionally notify the user here that the profile isn't loaded
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', data?.fullname || '');
//     if (selectedFile) formData.append('image', selectedFile);
//     try {
//       setIsLoading(true);
//       const res = await updateUser(user.id, formData);
//       console.log('ressssssssssssssssssssss', res);
//       if (res?.success) {
//         toast.success('Update profile successfully!');
//         setUser(res?.data);
//         reset(data);
//         setPreviewUrl(null);
//         setSelectedFile(null);
//         setPhotoChanged(false);
//       } else {
//         toast.error(
//           res?.message || 'Failed to update profile. Please try again later.',
//         );
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error('Something went wrong. Please try again in a moment.');
//     } finally {
//       setIsLoading(false);
//     }

//     // After successful save, reset dirty & photoChanged
//   };

//   // 👀 Watch fullname field for changes
//   const watchedFullname = watch('fullname');

//   // ✅ Enable button if name or image changed
//   const isFormChanged =
//     isDirty || photoChanged || watchedFullname !== user?.name;

//   return (
//     <div className="space-y-6 text-white">
//       <div className="grid grid-cols-2 gap-6">
//         <Card className="bg-[#151519] border-gray-700">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
//               <User className="w-4 h-4" />
//               Profile & Account
//             </CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             {/* Profile photo */}
//             <div className="flex items-center gap-3 mb-8">
//               <Avatar className="w-10 h-10 md:w-20 md:h-20 border border-secondary">
//                 <AvatarImage
//                   src={previewUrl || user?.avatarUrl || a1.src}
//                   className="object-cover"
//                 />
//                 <AvatarFallback className="bg-black text-white">
//                   {user?.name?.[0] || 'A'}
//                 </AvatarFallback>
//               </Avatar>

//               {!selectedFile ? (
//                 <label
//                   htmlFor="photo-upload"
//                   className="text-blue-400 text-sm cursor-pointer hover:underline"
//                 >
//                   Change Photo
//                   <input
//                     id="photo-upload"
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleFileChange}
//                   />
//                 </label>
//               ) : (
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm text-gray-300">
//                     {selectedFile.name}
//                   </span>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={handleRemoveImage}
//                     className="text-red-500 hover:text-red-400"
//                     type="button"
//                   >
//                     <X className="w-4 h-4" />
//                   </Button>
//                 </div>
//               )}
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="fullname" className="text-white">
//                   Full Name
//                 </Label>
//                 <Input
//                   id="fullname"
//                   {...register('fullname')}
//                   className="text-white"
//                 />
//                 {errors.fullname && (
//                   <p className="text-red-400 text-xs">
//                     {errors.fullname.message}
//                   </p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-white">
//                   Email Address
//                 </Label>
//                 <Input
//                   id="email"
//                   {...register('email')}
//                   className="text-white"
//                   disabled
//                 />
//                 {errors.email && (
//                   <p className="text-red-400 text-xs">{errors.email.message}</p>
//                 )}
//               </div>

//               <Button
//                 type="submit"
//                 disabled={!isFormChanged}
//                 className={`w-full border-0 cursor-pointer ${
//                   isFormChanged
//                     ? 'bg-[#2A2D33] hover:bg-gray-600 text-white'
//                     : 'bg-gray-700 text-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 {isLoading ? 'Saving...' : 'Save Changes'}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminProfileTab;

'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useUser from '@/hooks/useUser';
import { updateUser } from '@/services/auth';
import { User, X } from 'lucide-react';
import { toast } from 'sonner';
import a1 from '../../../../../assets/dashboard/admin/profile/avatar.png';

// ✅ Zod Schema with file validation
const profileSchema = z.object({
  fullname: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .optional(),
  email: z.string().email('Invalid email address').optional(),
  photo: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: 'Photo must be a valid file',
    })
    .refine(
      (file) => !file || file.size <= 1024 * 1024, // ✅ Less than or equal to 1MB
      { message: 'Image must be less than 1 MB' },
    ),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const AdminProfileTab = () => {
  const { user, setUser } = useUser();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoChanged, setPhotoChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null); // ✅ Local file error state

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: '',
      email: '',
    },
  });

  // ✅ Reset when user data loads
  useEffect(() => {
    if (user) {
      reset({
        fullname: user.name || '',
        email: user.email || '',
      });
      setPreviewUrl(user.avatarUrl || a1.src);
      setPhotoChanged(false);
      setSelectedFile(null);
    }
  }, [user, reset]);

  // 📸 Handle image upload with validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ Check file size before setting
    if (file.size > 1024 * 1024) {
      setFileError('Image must be less than 1 MB');
      setSelectedFile(null);
      setPreviewUrl(user?.avatarUrl || a1.src);
      setPhotoChanged(false);
      setValue('photo', undefined);
      return;
    }

    setFileError(null); // ✅ Clear any previous error
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setValue('photo', file);
    setPhotoChanged(true);
  };

  // ❌ Remove selected image
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(user?.avatarUrl || a1.src);
    setValue('photo', undefined);
    setPhotoChanged(false);
    setFileError(null);
  };

  // 🧾 Form submit
  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.id) return;

    const formData = new FormData();
    formData.append('name', data?.fullname || '');
    if (selectedFile) formData.append('image', selectedFile);
    try {
      setIsLoading(true);
      const res = await updateUser(user.id, formData);
      if (res?.success) {
        toast.success('Update profile successfully!');
        setUser(res?.data);
        reset(data);
        setPreviewUrl(null);
        setSelectedFile(null);
        setPhotoChanged(false);
      } else {
        toast.error(
          res?.message || 'Failed to update profile. Please try again later.',
        );
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  // 👀 Watch fullname field for changes
  const watchedFullname = watch('fullname');

  // ✅ Enable button if form changed and no file error
  const isFormChanged =
    (isDirty || photoChanged || watchedFullname !== user?.name) && !fileError;

  return (
    <div className="space-y-6 text-white">
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#151519] border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile & Account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Profile photo */}
            <div className="flex items-center gap-3 mb-8">
              <Avatar className="w-10 h-10 md:w-20 md:h-20 border border-secondary">
                <AvatarImage
                  src={previewUrl || user?.avatarUrl || a1.src}
                  className="object-cover"
                />
                <AvatarFallback className="bg-black text-white">
                  {user?.name?.[0] || 'A'}
                </AvatarFallback>
              </Avatar>

              {!selectedFile ? (
                <label
                  htmlFor="photo-upload"
                  className="text-blue-400 text-sm cursor-pointer hover:underline"
                >
                  Change Photo
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-300">
                    {selectedFile.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveImage}
                    className="text-red-500 hover:text-red-400"
                    type="button"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* ⚠️ File error message */}
            {fileError && (
              <p className="text-red-400 text-xs -mt-6 mb-4">{fileError}</p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  {...register('fullname')}
                  className="text-white"
                />
                {errors.fullname && (
                  <p className="text-red-400 text-xs">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  {...register('email')}
                  className="text-white"
                  disabled
                />
                {errors.email && (
                  <p className="text-red-400 text-xs">{errors.email.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!isFormChanged || isLoading}
                className={`w-full border-0 cursor-pointer ${
                  isFormChanged
                    ? 'bg-[#2A2D33] hover:bg-gray-600 text-white'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfileTab;
