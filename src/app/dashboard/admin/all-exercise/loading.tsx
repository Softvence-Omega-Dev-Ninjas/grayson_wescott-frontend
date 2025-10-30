import { FaSpinner } from 'react-icons/fa';
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[200px] space-y-3 animate-pulse">
      <FaSpinner className="animate-spin text-white text-2xl md:text-5xl" />
      <p className="text-gray-300 text-sm font-medium">
        Loading exercises, please wait...
      </p>
    </div>
  );
}
