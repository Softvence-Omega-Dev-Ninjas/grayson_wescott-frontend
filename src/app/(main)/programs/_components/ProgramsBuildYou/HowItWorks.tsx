import ProgramCard from "@/components/shared/main/ProgramCard/ProgramCard"
import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader"
 import b1 from '../../../../../assets/whatyouwilldo/1.png'
 import b2 from '../../../../../assets/whatyouwilldo/2.png'
 import b3 from '../../../../../assets/whatyouwilldo/3.png'
 
 

function HowItWorks() {

const data =[
  {
    icon: b1,
    title: "Weeks 1-4: Foundation & Patterning",
    subtitle: "Build movement quality and establish training rhythm with moderate intensity"
  },
  {
    icon: b2,
    title: "Weeks 5-8: Overload & Density",
    subtitle: "Increase training load and volume to drive strength adaptations"
  },
  {
    icon: b3,
    title: "Weeks 9-12: Peaking & Test",
    subtitle: "Taper volume while maintaining intensity for competition readiness"
  }
]

  return (
    <div className="space-y-5 max-w-5xl mx-auto  " >

        <SectionHeader title="How It Works  "/>


        <div className="space-y-5">

            {
                data.map((item)=>(
                    <ProgramCard key={item.title} title={item.title} icon={item.icon.src} subtitle={item.subtitle}/>
                ))
            }

        </div>
    </div>
  )
}

export default  HowItWorks