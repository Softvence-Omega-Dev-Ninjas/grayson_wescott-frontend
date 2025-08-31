import { Badge } from "@/components/ui/badge"
import icon from '../../../../../assets/userDashboard/progress/dumbell.png'
import { Avatar } from "@/components/ui/avatar"
import Image from "next/image"
export function ProgramHeader() {
  return (
    <div className="bg-[#2A2D33] rounded-lg p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10  rounded-lg flex items-center justify-center">
         <Image src={icon.src} alt="icon" width={50} height={50}/> 
        </div>
        <div>
          <h1 className="text-xl font-semibold">Strength Building Program</h1>
          <p className="text-slate-400 text-sm">12-week progressive overload training</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="bg-blue-600 text-white">
              Active
            </Badge>
            <span className="text-slate-400 text-sm">Week 8 of 12</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-3xl font-bold">67%</div>
        <div className="text-slate-400 text-sm">Completion Rate</div>
      </div>
    </div>
  )
}
