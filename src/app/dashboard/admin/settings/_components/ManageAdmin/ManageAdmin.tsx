// 'use client';

// import a1 from '@/assets/dashboard/messages/Avatar1.png';
// import a2 from '@/assets/dashboard/messages/Avatar2.png';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { deleteAdmin, getAllAdmins } from '@/services/admin/manage-admin';
// import { Loader2, Trash2 } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { toast } from 'sonner';
// import CreateAdminModal from './_components/CreateAdminModal/CreateAdminModal';

// type AdminType = {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   avatarUrl?: string;
// };

// const fallbackAvatars = [a1, a2];

// const ManageAdmin = () => {
//   const [admins, setAdmins] = useState<AdminType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         setLoading(true);
//         const res = await getAllAdmins();

//         if (res?.success && Array.isArray(res?.data)) {
//           setAdmins(res.data);
//         } else {
//           toast.error(res?.message || 'Failed to load admins');
//         }
//       } catch (err) {
//         console.error('❌ Error fetching admins:', err);
//         toast.error('Something went wrong while fetching admins.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdmins();
//   }, []);

//   const handleDelete = async (id: string) => {
//     try {
//       setDeletingId(id);
//       const res = await deleteAdmin(id);

//       if (res?.success) {
//         toast.success('Admin deleted successfully.');
//         setAdmins((prev) => prev.filter((a) => a.id !== id));
//       } else {
//         toast.error(res?.message || 'Failed to delete admin');
//       }
//     } catch (err) {
//       console.error('❌ Error deleting admin:', err);
//       toast.error('Something went wrong while deleting admin.');
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   return (
//     <div className="bg-black border-none min-h-screen p-4">
//       {/* Header */}
//       <div className="flex flex-row items-center justify-between mb-6 flex-wrap gap-5">
//         <h1 className="text-white font-bold text-2xl">Manage Admins</h1>
//         <CreateAdminModal />
//       </div>

//       {/* Loading State */}
//       {loading ? (
//         <div className="flex justify-center items-center py-10 text-gray-400">
//           <Loader2 className="animate-spin mr-2" /> Loading admins...
//         </div>
//       ) : admins.length === 0 ? (
//         <div className="text-center text-gray-400 py-10">No admins found.</div>
//       ) : (
//         <div className="space-y-4">
//           {admins.map((admin, index) => (
//             <div
//               key={admin.id || index}
//               className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between p-3 border border-gray-900 bg-primary-200"
//             >
//               {/* Avatar + Info */}
//               <div className="flex items-center gap-3">
//                 <Avatar className="h-10 w-10">
//                   <AvatarImage
//                     src={
//                       admin.avatarUrl ||
//                       fallbackAvatars[index % fallbackAvatars.length].src
//                     }
//                     alt={admin.name}
//                   />
//                   <AvatarFallback>
//                     {admin.name
//                       .split(' ')
//                       .map((n) => n[0])
//                       .join('')
//                       .toUpperCase()}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium text-white">{admin.name}</p>
//                   <p className="text-sm text-gray-300">{admin.email}</p>
//                 </div>
//               </div>

//               {/* Role + Actions */}
//               <div className="flex items-center gap-2">
//                 <Badge
//                   variant={admin.role === 'Admin' ? 'default' : 'secondary'}
//                   className="text-white px-3 py-2 bg-secondary rounded-none"
//                 >
//                   {admin.role}
//                 </Badge>

//                 {/* Delete with confirmation */}
//                 <AlertDialog>
//                   <AlertDialogTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="py-3 bg-secondary text-white border-transparent cursor-pointer hover:bg-secondary hover:text-white rounded-none flex items-center justify-center"
//                       disabled={deletingId === admin.id}
//                     >
//                       {deletingId === admin.id ? (
//                         <Loader2 className="h-5 w-5 animate-spin" />
//                       ) : (
//                         <Trash2 className="h-6 w-6" />
//                       )}
//                     </Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>Delete Admin</AlertDialogTitle>
//                       <AlertDialogDescription>
//                         Are you sure you want to delete{' '}
//                         <span className="font-semibold">{admin.name}</span>?
//                         This action cannot be undone.
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                       <AlertDialogCancel className="bg-gray-800 text-gray-300 hover:bg-gray-700">
//                         Cancel
//                       </AlertDialogCancel>
//                       <AlertDialogAction
//                         onClick={() => handleDelete(admin.id)}
//                         className="bg-red-600 hover:bg-red-700 text-white"
//                       >
//                         Delete
//                       </AlertDialogAction>
//                     </AlertDialogFooter>
//                   </AlertDialogContent>
//                 </AlertDialog>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageAdmin;

'use client';

import a1 from '@/assets/dashboard/messages/Avatar1.png';
import a2 from '@/assets/dashboard/messages/Avatar2.png';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { deleteAdmin, getAllAdmins } from '@/services/admin/manage-admin';
import { Loader2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CreateAdminModal from './_components/CreateAdminModal/CreateAdminModal';

type AdminType = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
};

const fallbackAvatars = [a1, a2];

const ManageAdmin = () => {
  const [admins, setAdmins] = useState<AdminType[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ✅ Reusable fetch function
  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await getAllAdmins();

      if (res?.success && Array.isArray(res?.data)) {
        setAdmins(res.data);
      } else {
        toast.error(res?.message || 'Failed to load admins');
      }
    } catch (err) {
      console.error('❌ Error fetching admins:', err);
      toast.error('Something went wrong while fetching admins.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const res = await deleteAdmin(id);

      if (res?.success) {
        toast.success('Admin deleted successfully.');
        setAdmins((prev) => prev.filter((a) => a.id !== id));
      } else {
        toast.error(res?.message || 'Failed to delete admin');
      }
    } catch (err) {
      console.error('❌ Error deleting admin:', err);
      toast.error('Something went wrong while deleting admin.');
    } finally {
      setDeletingId(null);
    }
  };

  // ✅ Pass callback to refresh after creating admin
  return (
    <div className="bg-black border-none min-h-screen p-4">
      {/* Header */}
      <div className="flex flex-row items-center justify-between mb-6 flex-wrap gap-5">
        <h1 className="text-white font-bold text-2xl">Manage Admins</h1>
        <CreateAdminModal onAdminCreated={fetchAdmins} />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10 text-gray-400">
          <Loader2 className="animate-spin mr-2" /> Loading admins...
        </div>
      ) : admins.length === 0 ? (
        <div className="text-center text-gray-400 py-10">No admins found.</div>
      ) : (
        <div className="space-y-4">
          {admins.map((admin, index) => (
            <div
              key={admin.id || index}
              className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between p-3 border border-gray-900 bg-primary-200"
            >
              {/* Avatar + Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      admin.avatarUrl ||
                      fallbackAvatars[index % fallbackAvatars.length].src
                    }
                    alt={admin.name}
                  />
                  <AvatarFallback>
                    {admin.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{admin.name}</p>
                  <p className="text-sm text-gray-300">{admin.email}</p>
                </div>
              </div>

              {/* Role + Actions */}
              <div className="flex items-center gap-2">
                <Badge
                  variant={admin.role === 'Admin' ? 'default' : 'secondary'}
                  className="text-white px-3 py-2 bg-secondary rounded-none"
                >
                  {admin.role}
                </Badge>

                {/* Delete with confirmation */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="py-3 bg-secondary text-white border-transparent cursor-pointer hover:bg-secondary hover:text-white rounded-none flex items-center justify-center"
                      disabled={deletingId === admin.id}
                    >
                      {deletingId === admin.id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Trash2 className="h-6 w-6" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-primary-200 border border-secondary text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Admin</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete{' '}
                        <span className="font-semibold">{admin.name}</span>?
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-secondary text-gray-300 hover:bg-gray-700 border-none cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(admin.id)}
                        className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAdmin;
