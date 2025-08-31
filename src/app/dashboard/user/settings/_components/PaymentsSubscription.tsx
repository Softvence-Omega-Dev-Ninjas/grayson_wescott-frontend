import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard } from "lucide-react"

export function PaymentsSubscription() {
  // Example transactions data
  const transactions = [
    { date: "Feb 15, 2024", amount: "$29.99" },
    { date: "Jan 15, 2024", amount: "$29.99" },
    { date: "Dec 15, 2023", amount: "$29.99" },
  ]

  return (
    <Card className="bg-[#151519] border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Payments & Subscription
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Subscription Info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm">Premium Plan</p>
            <p className="text-gray-400 text-xs">Next renewal March 15, 2024</p>
          </div>
          <Badge className="bg-green-600 text-white">Active</Badge>
        </div>

        {/* Payment Method */}
        <div>
          <p className="text-gray-400 text-sm">Payment Method</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">••••</span>
            </div>
            <span className="text-white text-sm">•••• 4242</span>
            <span className="text-gray-400 text-sm cursor-pointer hover:underline">Update</span>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <p className="text-gray-400 text-sm">Recent Transactions</p>
          <div className="space-y-2 mt-2">
            {transactions.map((txn, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-white">{txn.date}</span>
                <span className="text-white">{txn.amount}</span>
              </div>
            ))}
          </div>
          <p className="text-blue-400 text-sm mt-2 cursor-pointer hover:underline">View All</p>
        </div>
      </CardContent>
    </Card>
  )
}
