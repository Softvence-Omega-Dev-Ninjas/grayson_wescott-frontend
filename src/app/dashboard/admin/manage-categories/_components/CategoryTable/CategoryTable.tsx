'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteConfirmationModal from '@/components/ui/core/DeleteConfirmationModal/DeleteConfirmationModal';
import { deleteCategory } from '@/services/admin/category';
import { ICategory } from '@/types/category.types';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function CategoryTable({ categoryData }: { categoryData: ICategory[] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ICategory | null>(null);

  const handleDelete = (data: ICategory) => {
    setSelectedItem(data);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsLoading(true);
      if (selectedItem?.id) {
        const res = await deleteCategory(selectedItem?.id);
        if (res?.success) {
          toast.success(res?.message);
          setModalOpen(false);
        } else {
          toast.error(res?.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mb-8 ">
      {/* Desktop Table */}
      <div className="overflow-x-auto border border-secondary">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-secondary text-white">
              <th className="text-left py-3 px-5 font-semibold">
                Category Name
              </th>
              <th className="text-left py-3 px-5 font-semibold">
                Category Description
              </th>
              <th className="text-left py-3 px-5 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryData?.map((item, index) => (
              <tr key={index} className="border-b border-gray-800/50">
                <td className="py-4 px-5 text-white">{item?.name}</td>
                <td className="py-4 px-5 text-gray-300">{item?.description}</td>
                <td className="py-4 px-5 ">
                  <Trash
                    onClick={() => handleDelete(item)}
                    className="text-red-500 hover:text-red-600 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteConfirmationModal
        name={selectedItem?.name}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isLoading}
      />
    </div>
  );
}
