import SkeletonBox from "../util/SkeletonLoading"

export default function RecipesLoader(){
  return(
      <div className="mt-6 grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="shadow-Combined font-Poppins flex h-[500px] flex-col justify-between gap-[16px] rounded-xl bg-[#FFFFFF] p-6"
                                >
                                    <div className="flex flex-row gap-4">
                                            <SkeletonBox className="skeleton h-[190px] w-full " />
                                 
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <SkeletonBox className="skeleton mb-2 h-[10px] w-2/3" />
                                       
    
                                        <SkeletonBox className="skeleton h-[10px] w-full" />
                                        <SkeletonBox className="skeleton h-[10px] w-full" />
    
                                        <SkeletonBox className="skeleton h-[10px] w-2/3" />
                                    </div>
                                    <div className="grid grid-cols-2 grid-rows-2 gap-2">
                                        <SkeletonBox className="skeleton h-[25px] w-2/3" />
                                        <SkeletonBox className="skeleton h-[25px] w-2/3" />
                                        <SkeletonBox className="skeleton h-[25px] w-2/3" />
                                        <SkeletonBox className="skeleton h-[25px] w-2/3" />

                                    </div>
                                    <div className="flex flex-row justify gap-4">
                                        <SkeletonBox className="skeleton h-[25px] w-full"></SkeletonBox>
                                    </div>
                                </div>
                            ))}
                        </div>
  )
}