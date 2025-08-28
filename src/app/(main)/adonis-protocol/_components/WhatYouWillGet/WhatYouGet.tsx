import BaseCard from '@/components/shared/main/BaseCard/BaseCard'
import { Button } from '@/components/ui/button'
import React from 'react'
import w1 from '../../../../../assets/adonisProtocol/w1.png'
import w2 from '../../../../../assets/adonisProtocol/w2.png'
import w3 from '../../../../../assets/adonisProtocol/w3.png'
import w4 from '../../../../../assets/adonisProtocol/w4.png'
import w5 from '../../../../../assets/adonisProtocol/w5.png'
import w6 from '../../../../../assets/adonisProtocol/w6.png'
import SectionHeader from '@/components/shared/main/SectionHeader/SectionHeader'

function WhatYouGet() {
     const data =[
        {
     
    img: w1.src,
    title: "Weekly video lessons",
    description: "Step-by-step guidance with actionable checklists for every module."
  },
      {
     
    img: w2.src,
    title: "12-week progression",
    description: "Structured path to transformation with measurable milestones."
  },
    {
     
    img: w3.src,
    title: "Downloadable planners",
    description: "Planners, trackers, grooming routines, and style guides."
  },
    {
     
    img: w4.src,
    title: "Elite community",
    description: "Connect with like-minded men and get your questions answered."
  },
    {
     
    img: w5.src,
    title: "Personal Coaching",
    description: "Direct access to expert guidance for Elite and Private members."
  },
  {
     
    img: w6.src,
    title: "24/7 Support",
    description: "Get help whenever you need it on your transformation journey."
  },
    ]
  return (
   <div className=" py-4 space-y-5 bg-[#151519]">

        

        <div className="container mx-auto space-y-4 sm:space-y-6 px-2">

          <SectionHeader title='What You Get' description='Everything you need for complete transformation'/>
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {data.map((item, idx) => (
              <BaseCard key={idx} item={item} />
            ))}
          </div>

        
          
        </div>

        <div className="flex items-center justify-center mt-14">
          <Button className="bg-[#B9BDC6] uppercase text-black px-6 py-4 rounded-none hover:bg-[#a5a8ae] cursor-pointer">Start Your Build</Button>
        </div>
        

    </div>
  )
}

export default WhatYouGet