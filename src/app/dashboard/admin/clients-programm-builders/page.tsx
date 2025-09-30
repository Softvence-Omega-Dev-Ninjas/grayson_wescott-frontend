import { Plus } from "lucide-react";
import Link from "next/link";
const demoProgramm = [
  { prgrammName: "Back Squat", category: "Lower Body" },
  { prgrammName: "Front Squat", category: "Lower Body" },
  { prgrammName: "Split Squat", category: "Lower Body" },
];
const ClientsProgrammBuildersPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <h1 className="text-xl font-bold">Excercise Library</h1>
        <Link href={"/dashboard/admin/clients-programm-builders/add-program"}>
          <button
            type="button"
            className="cursor-pointer font-medium py-2.5 px-6 flex items-center gap-2 bg-secondary text-white hover:bg-secondary/75"
          >
            <Plus />
            Add Program
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-5 mt-10">
        {demoProgramm.map((item, idx) => {
          return (
            <div
              key={idx}
              className="w-full flex items-center justify-between gap-5  bg-primary-200 hover:bg-primary-200/85 border border-secondary h-auto font-medium py-4 px-4 transition-colors duration-200 cursor-pointer"
            >
              <div className="text-left">
                <p className="font-semibold text-lg">{item.prgrammName}</p>
                <p className="text-base text-gray-400">{item.category}</p>
              </div>
              <Plus />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientsProgrammBuildersPage;
