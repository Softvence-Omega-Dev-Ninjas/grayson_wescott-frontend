/* eslint-disable @typescript-eslint/no-explicit-any */

import { DollarSign, FileText, Users } from 'lucide-react';

export function StatesCard({ res }: { res: any }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className={'bg-primary-200 border border-[#a5a7ac]'}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-white">Total Clients</p>
              <p className="text-2xl font-bold text-white">
                {res?.totalClients}
              </p>
              <p
                className={'text-sm text-white'}
              >{`+${res?.addedThisMonth}% this month`}</p>
            </div>

            <div className="h-12 w-12 text-white bg-secondary p-2">
              <Users className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className={'bg-primary-200 border border-[#a5a7ac]'}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-white">Active Clients</p>
              <p className="text-2xl font-bold text-white">
                {res?.activeClients}
              </p>
              <p
                className={'text-sm text-white'}
              >{`+${res?.activeClientThisMonth}% this month`}</p>
            </div>

            <div className="h-12 w-12 text-white bg-secondary p-2">
              <FileText className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
      <div className={'bg-primary-200 border border-[#a5a7ac]'}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-white">Monthly Revenue</p>
              <p className="text-2xl font-bold text-white">
                {res?.totalRevenue}
              </p>
              <p
                className={'text-sm text-white'}
              >{`+${res?.revenueThisMonth}% this month`}</p>
            </div>

            <div className="h-12 w-12 text-white bg-secondary p-2">
              <DollarSign className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
