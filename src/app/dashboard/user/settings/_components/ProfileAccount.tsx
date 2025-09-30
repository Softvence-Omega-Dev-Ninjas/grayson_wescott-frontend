import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import a1 from '../../../../../assets/dashboard/messages/Avatar.png'

export function ProfileAccount() {
  return (
    <Card className="bg-[#151519] border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
          <User className="w-4 h-4" />
          Profile & Account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={a1.src} className="object-cover" />
            <AvatarFallback className="bg-black text-white">AJ</AvatarFallback>
          </Avatar>
          <span className="text-blue-400 text-sm cursor-pointer hover:underline">Change Photo</span>
        </div>

        <div className="space-y-3">
          <div className="border border-gray-900 px-3 py-1">
            <label className="text-gray-400 text-xs">Full Name</label>
            <p className="text-white text-sm">Alex Johnson</p>
          </div>

          <div  className="border border-gray-900 px-3 py-1" >
            <label className="text-gray-400 text-xs">Email</label>
            <p className="text-white text-sm">alex.johnson@email.com</p>
          </div>
        </div>

        <Button className="w-full bg-[#2A2D33]  hover:bg-gray-600 text-white border-0 cursor-pointer">Change Password</Button>
      </CardContent>
    </Card>
  )
}
