import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import a1 from '../../../../../assets/dashboard/messages/Avatar1.png';
import a2 from '../../../../../assets/dashboard/messages/Avatar2.png';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const adminsData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Admin',
    avatar: a1,
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Manager',
    avatar: a2,
  },
];

const ManageAdmin = () => {
  return (
    <div>
      {/* Manage Admins */}
      <div className="bg-black border-none">
        <div>
          <div className="flex items-center justify-between">
            <div className="text-white">Manage Admins</div>
            <Button size="sm" className="bg-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Add New Admin
            </Button>
          </div>
        </div>
        <div>
          <div className="space-y-4 ">
            {adminsData.map((admin) => (
              <div
                key={admin.id}
                className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between p-3 border border-gray-900  rounded-lg"
              >
                <div className="flex items-center gap-3 border ">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={admin.avatar.src || '/placeholder.svg'}
                      alt={admin.name}
                    />
                    <AvatarFallback>
                      {admin.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{admin.name}</p>
                    <p className="text-sm text-gray-300">{admin.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={admin.role === 'Admin' ? 'default' : 'secondary'}
                    className="text-white px-3 py-2 bg-secondary"
                  >
                    {admin.role}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="  bg-secondary text-white border-transparent cursor-pointer hover:bg-secondary hover:text-white rounded-none"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="  bg-secondary text-white border-transparent cursor-pointer hover:bg-secondary hover:text-white rounded-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;
