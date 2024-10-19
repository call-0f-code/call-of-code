import Image from "next/image"
function MembersHead(){
    return(
        <div className="flex flex-col relative">
           
           <div className="flex items-center h-screen ml-44 text-8xl z-10">
            MEMBERS__
            </div>
            <div className="">
            <Image src="/batman.png" alt="background image" layout="fill" objectFit="cover" className="z-0" />
            </div>
            
            
        </div>
    )
}

export default MembersHead