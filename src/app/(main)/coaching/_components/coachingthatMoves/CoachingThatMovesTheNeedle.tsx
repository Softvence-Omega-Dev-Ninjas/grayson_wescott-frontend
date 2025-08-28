import SectionHeader from "@/components/shared/main/SectionHeader/SectionHeader";
import a1 from '../../../../../assets/coaching/audit1.png'
import a2 from '../../../../../assets/coaching/aduit2.png'

import tik from '../../../../../assets/coaching/whitetik.png'
import Image from "next/image";


interface coaching {
    img:string,
    title:string,
    subtitle:string,
    features:string[],
    price:string,
    session:string,
    btn?:string,
    onClick?:()=>void
}


function CoachingThatMovesTheNeedle() {

    const data:coaching [] = [
        {
            img:a1.src,
            title: "Performance Audit",
            subtitle:"One-Time",
            features:[
                "60-minute video audit",
                "Form breakdown analysis",
                "2-week tune-up plan"
            ],
            price:"299",
            session: "One-time payment",
            btn:"Book Audit"

        },
        {
            img:a2.src,
            title: "1:1 Coaching",
            subtitle:"Monthly",
            features:[
                "Fully custom plan",
                "Weekly check-ins",
                "Video feedback"
            ],
            price:"399",
            session: "Recurring",
            btn:"Apply"

        },
    ]

   

    
  

    return (
        <div className="     text-white py-12 px-4 md:px-8">
            <SectionHeader
                title='Coaching that moves the needle.'
                description='Get personalized guidance to accelerate your progress and achieve breakthrough results'
            />

            <div className='max-w-4xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-8 mt-10'>
                {data.map((item) => (
                    <div key={item.title} className="flex flex-col justify-between gap-6 bg-[#2A2D33] p-6 min-h-[400px]">
                        <div className="flex gap-2">

                            <div className="bg-gray-300 p-3 rounded-md flex items-center justify-center ">
                                 {/* <img className='w-8 h-8' src={item.img} alt="" /> */}
                                 <Image src={item.img} alt="logo" width={32} height={32}/>
                         </div>
                            <div className="">
                                <h1 className="font-semibold text-2xl">{item.title}</h1>
                                <p className="font-normal text-sm text-gray-400">{item.subtitle}</p>
                            </div>

                        </div>

                        <div className="border-b-1 border-white pb-5">
                            {
                                item.features.map((feature)=>(
                                    <div className="flex gap-2 items-center" key={feature}>
                                        {/* <img src={tik.src} alt="" /> */}
                                        <Image src={tik.src} alt="logo" width={15} height={15}/>
                                        <p className="text-gray-400">{feature}</p>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="flex justify-between items-center">

                            <p className="md:text-4xl text-2xl font-bold">${item.price}</p>
                            <p className="text-gray-400 ">{item.session}</p>

                        </div>

                        <button className="bg-[#B9BDC6] px-4 py-2 cursor-pointer hover:bg-black/30">{item.btn}</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CoachingThatMovesTheNeedle;
