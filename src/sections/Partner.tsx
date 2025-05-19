import {Button} from "@/components";
import { partnerCircles } from "@/assets/images";

const Partner = () => {
  return (
    <section className='md:mx-25 max-md:px-6 overflow-hidden mt-4.5 sm:mt-[82px] mb-7 sm:mb-[71px]'>
        <div className="relative bg-primary lg:h-[435px] rounded-[28px] flex max-md:flex-col items-center">
            <div className=" flex-1 flex flex-col gap-4 lg:p-21 sm:p-10 px-4 py-5 max-sm:text-center max-sm:items-center ">
                <h2 className="text-white max-w-[617px] max-sm:text-xl">Partner With Jade D’val – Empower Africa’s Next Techstars</h2>
                <p className="text-white max-w-[617px] max-sm:text-sm max-sm:leading-[150%]">Whether you're an individual, an organization, or an investor, 
                    partnering with Jade D’val means supporting Africa’s boldest talents as they rise in tech. <br className="md:block hidden"/>
                    Let’s co-create the future—one developer, designer, and data wizard at a time.
                </p>
                <Button children="Become a partner" bgColor="bg-white" textColor="text-primary" className="max-w-[327px] py-[10.5px] text-sm" />
            </div>
            <div className="absolute right-0 h-f lg:max-w-[600px] max-sm:hidden md:max-w-[400px]">
                <img src={partnerCircles} alt="partner" className="w-full h-full" />
            </div>
        </div>
    </section>
  )
}

export default Partner