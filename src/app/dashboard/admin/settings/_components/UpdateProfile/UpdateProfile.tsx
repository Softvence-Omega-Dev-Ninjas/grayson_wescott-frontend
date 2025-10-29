'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import a1 from '@/assets/dashboard/admin/profile/avatar.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useUser from '@/hooks/useUser';
import { updateUser } from '@/services/auth';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { profileSchema, TProfileFormData } from './schema/profileSchema';

const UpdateProfile = () => {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  //Hanling image upload and preview
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoChanged, setPhotoChanged] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<TProfileFormData>({
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

  // Handle image upload with validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size before setting
    if (file.size > 1024 * 1024) {
      setFileError('Image must be less than 1 MB');
      setSelectedFile(null);
      setPreviewUrl(user?.avatarUrl || a1.src);
      setPhotoChanged(false);
      setValue('photo', undefined);
      return;
    }

    setFileError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setValue('photo', file);
    setPhotoChanged(true);
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(user?.avatarUrl || a1.src);
    setValue('photo', undefined);
    setPhotoChanged(false);
    setFileError(null);
  };

  // Form submit
  const onSubmit = async (data: TProfileFormData) => {
    const formData = new FormData();
    formData.append('name', data?.fullname || '');
    if (selectedFile) formData.append('image', selectedFile);
    try {
      setIsLoading(true);
      const res = await updateUser(formData);
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

  // Watch fullname field for changes
  const watchedFullname = watch('fullname');

  // Enable button if form changed and no file error
  const isFormChanged =
    (isDirty || photoChanged || watchedFullname !== user?.name) && !fileError;

  return (
    <div className="">
      <Card className="bg-primary-200 border-2 border-secondary rounded-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg font-semibold flex items-center gap-2">
            {/* <User className="w-4 h-4" /> */}
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
              className="w-full border-0 cursor-pointer bg-[#2A2D33] hover:bg-gray-600 text-white"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfile;
