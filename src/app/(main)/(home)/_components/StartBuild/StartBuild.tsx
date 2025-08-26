import SectionHeader from '@/components/shared/main/SectionHeader/SectionHeader'
import { Button } from '@/components/ui/button'
import React from 'react'

function StartBuild() {
  return (
    <div className='container space-y-6 mx-auto'>
        <SectionHeader title='Start Building What Others Chase'
        description='The strongest version of you isn’t a dream—it’s a system. Engineered, tested, delivered'/>

<div className='flex justify-center'>
           <button className="font-semibold bg-[#B9BDC6] py-3 px-5 w-fit mx-auto cursor-pointer text-black transition-all ease-in-out hover:bg-[#1A1A1A] hover:text-white">Start Your Build</button>

</div>
    </div>
  )
}

export default StartBuild