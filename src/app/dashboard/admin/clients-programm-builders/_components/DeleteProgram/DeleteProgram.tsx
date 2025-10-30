'use client';
import { deleteProgram } from '@/services/admin/programm';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'sonner';

const DeleteProgram = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await deleteProgram(id);
      if (res?.success) {
        toast.success('Program deleted successfully!');
      } else {
        toast.error(
          res?.message || 'Failed to delete program. Please try again later.',
        );
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <FaSpinner className="animate-spin text-white text-xl" />
      ) : (
        <Trash2
          className="hover:text-red-500 duration-700 cursor-pointer"
          onClick={handleDelete}
        />
      )}
    </div>
  );
};

export default DeleteProgram;
