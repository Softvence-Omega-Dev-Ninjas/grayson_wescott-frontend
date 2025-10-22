/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getNotification } from '@/services/user/progress-tracking';
import { useEffect, useState } from 'react';
import { MdNotifications, MdOutlineNotificationsNone } from 'react-icons/md';

const Notification = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getNotification();
      setNotifications(res?.data || []);
    };
    fetchData();
  }, []);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MdOutlineNotificationsNone className="text-2xl cursor-pointer mt-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-primary-200 p-2">
          <div className=" max-h-96 overflow-y-auto w-80">
            {notifications?.map((message: any) => (
              <DropdownMenuItem key={message?.id} className="w-full">
                <div
                  className={`bg-[#2A2D33] rounded-lg p-2 border-l-4 border-primary-100 w-full`}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm bg-primary-100 shrink-0`}
                    >
                      <MdNotifications />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-white">
                        {message?.title}
                      </h4>
                      <p className="text-slate-300 text-sm mt-1">
                        {message?.message}
                      </p>
                      <span className="text-xs text-slate-400 mt-2 block">
                        {message?.sent}
                      </span>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notification;
