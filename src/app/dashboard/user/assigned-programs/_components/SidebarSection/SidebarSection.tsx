import { TSidebarItem } from "../../page";

const SidebarSection = ({
  title,
  items,
}: {
  title: string;
  items: TSidebarItem[];
}) => (
  <div className="mb-4 border border-secondary">
    <div className="bg-secondary px-4 py-2">
      <h3 className="text-lg font-bold text-gray-100">{title}</h3>
    </div>
    <div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm border border-secondary px-4 py-3"
          >
            <span className="text-gray-300">{item.label}</span>
            <span className="text-gray-50 font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default SidebarSection;
