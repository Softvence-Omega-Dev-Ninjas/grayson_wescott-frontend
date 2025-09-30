import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader"
import BaseCard from "@/components/shared/main/BaseCard/BaseCard"
import user from '../../../../../assets/home/insidethe_protocol/profile.png'
import camera from '../../../../../assets/home/insidethe_protocol/camera.png'
import community from '../../../../../assets/home/insidethe_protocol/community.png'
import download from '../../../../../assets/home/insidethe_protocol/donwload.png'
import progress from '../../../../../assets/home/insidethe_protocol/progress.png'
 
function InsideTheProtocol() {
    const data =[
  {
    
    img: camera.src,
title: "Weekly video lessons",
    description: "& actionable checklists"
  },
  {
    
    img: progress.src,
    title: "12-week progression",
    description: "Structured plan"
  },
  {
     
   img: download.src,
    title: "Downloadable planners",
    description: "trackers, and grooming guides"
  },
  {
     
    img: community.src,
    title: "Elite community",
    description: "Private community & Q&A"
  },
  {
     
    img: user.src,
    title: "1 coaching access",
    description: "Elite & Private tiers"
  }
]
  return (
    <div className="bg-[#151519] py-4 space-y-5">

        <SectionHeader title="Inside the protocal"/>

        <div className="container mx-auto space-y-4 sm:space-y-6 px-2">
          {/* First row  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {data.slice(0, 3).map((item, idx) => (
              <BaseCard key={idx} item={item} />
            ))}
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:max-w-xl lg:max-w-5xl md:mx-auto">
            {data.slice(3, 5).map((item, idx) => (
              <BaseCard key={idx} item={item} />
            ))}
          </div>
        </div>
        

    </div>
  )
}

export default InsideTheProtocol
