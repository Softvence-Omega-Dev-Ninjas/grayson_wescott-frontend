/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMessages } from '@/services/user/progress-tracking';
import { BiSolidMessageRounded } from 'react-icons/bi';

const MessagesPanel = async () => {
  const res = await getMessages();
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Recent Messages</h2>
      </div>

      <div className="space-y-3">
        {res?.data?.length === 0 && (
          <div className="py-20 text-center text-gray-300">
            No messages found.
          </div>
        )}
        {res?.data?.length > 0 &&
          res?.data?.map((message: any) => (
            <div
              key={message?.id}
              className={`bg-[#2A2D33] rounded-lg p-4 border-l-4 border-primary-100`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm bg-primary-100`}
                >
                  <BiSolidMessageRounded />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{message?.title}</h4>
                  <p className="text-slate-400 text-sm mt-1">
                    {message?.message}
                  </p>
                  <span className="text-xs text-slate-500 mt-2 block">
                    {message?.sent}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default MessagesPanel;
