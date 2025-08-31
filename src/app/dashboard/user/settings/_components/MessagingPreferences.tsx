import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { MessageSquare } from "lucide-react"

export function MessagingPreferences() {
  return (
    <Card className="bg-[#151519] border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Messaging Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm">Direct Messages</p>
            <p className="text-gray-400 text-xs">Allow direct messages with your coach</p>
          </div>
          <Switch className="cursor-pointer" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm">Email Reminders</p>
            <p className="text-gray-400 text-xs">Get reminders about missed messages</p>
          </div>
          <Switch className="cursor-pointer"/>
        </div>
      </CardContent>
    </Card>
  )
}
