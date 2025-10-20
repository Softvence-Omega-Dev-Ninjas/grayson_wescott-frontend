const SidebarBox = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex justify-between items-center text-sm border border-secondary px-4 py-3">
    <span className="text-gray-300">{label}</span>
    <span className="text-gray-50 font-bold">{value}</span>
  </div>
);
export default SidebarBox;
