import PricingCard from "@/components/shared/main/PricingCard/PricingCard"
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader"
 



function PricingSection( ) {
    const pricing = [
  {
    title: "Protocol Core",
    price: "$1,250",
    batchText: "one-time",
    subtitle: "$450 × 3 months",
    features: ["LIFETIME ACCESS TO CORE SYSTEM"],
    btn: "Choose Plan",
    isEnable: false
  },
  {
    title: "Protocol + Elite Coaching",
    price: "$3,500",
    batchText: "one-time",
    subtitle: "$1,250 × 3 months",
    features: [
      "MONTHLY 1-ON-1 CALL",
      "PRIVATE COMMUNITY",
      "PERSONALIZED PLAN ADJUSTMENTS",
      "PRIORITY SUPPORT"
    ],
    btn: "Choose Plan",
    isEnable: true
  },
  {
    title: "Private Track",
    price: "$10,000",
    batchText: "starts at",
    subtitle: "",
    features: [
      "WEEKLY CALLS",
      "FULLY CUSTOMIZED PROGRAM",
      "DIRECT ACCESS TO HEAD COACH",
      "ELITE NETWORKING OPPORTUNITIES"
    ],
    btn: "Choose Plan",
    isEnable: false
  }
]
  return (
    <div>

        <SectionHeader title="Choose Your Track"
        description="Select the configuration that matches your performance requirements"/>

       
        <div className="container mx-auto grid md:grid-cols-3 grid-cols-1 gap-12">

            {pricing.map((item)=>(
                <PricingCard key={item.title} item={item}/>
            ))}

        </div>
      


    </div>
  )
}

export default PricingSection