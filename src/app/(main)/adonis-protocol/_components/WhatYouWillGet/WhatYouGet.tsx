import BaseCard from '@/components/shared/main/BaseCard/BaseCard'
import { Button } from '@/components/ui/button'
import React from 'react'
import w1 from '../../../../../assets/adonisProtocol/w1.png'
import w2 from '../../../../../assets/adonisProtocol/w2.png'
import w3 from '../../../../../assets/adonisProtocol/w3.png'
import w4 from '../../../../../assets/adonisProtocol/w4.png'
import w5 from '../../../../../assets/adonisProtocol/w5.png'
import w6 from '../../../../../assets/adonisProtocol/w6.png'

function WhatYouGet() {
     const data =[
        {
     
    img: w1.src,
    title: "Aesthetic Performance",
    description: "Build the physique that commands respect and turns heads wherever you go."
  },
      {
     
    img: w2.src,
    title: "Bio-Engineering & Grooming",
    description: "Optimize your appearance, grooming, and biohacks."
  },
    {
     
    img: w3.src,
    title: "Social Mastery",
    description: "Develop magnetic charisma and social intelligence that opens every door."
  },
    {
     
    img: w4.src,
    title: "Mindset & Discipline",
    description: "Forge unbreakable mental strength and unwavering self-discipline."
  },
    {
     
    img: w5.src,
    title: "Empire Systems",
    description: "Build wealth, influence, and legacy that lasts generations."
  },
  {
     
    img: w6.src,
    title: "Empire Systems",
    description: "Build wealth, influence, and legacy that lasts generations."
  },
    ]
  return (
   <div className=" py-4 space-y-5 bg-[#151519]">

        

        <div className="container mx-auto space-y-4 sm:space-y-6 px-2">
         
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