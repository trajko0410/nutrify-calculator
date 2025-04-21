import SkeletonBox from "../util/SkeletonLoading"

export default function NutritionistListLoader(){
  return(
      <div className="mt-6 grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="shadow-Combined font-Poppins flex h-[400px] flex-col justify-between gap-[16px] rounded-xl bg-[#FFFFFF] p-6"
                                >
                                    <div className="flex flex-row gap-4">
                                        <div className="flex gap-2 overflow-clip rounded-full">
                                            <SkeletonBox className="skeleton h-[64px] w-[64px] overflow-clip rounded-full" />
                                        </div>
                                        <div className="flex w-full flex-col justify-center gap-2">
                                            <SkeletonBox className="skeleton mb-2 h-[10px] w-1/3" />
                                            <SkeletonBox className="skeleton h-[10px] w-full" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <SkeletonBox className="skeleton mb-2 h-[10px] w-1/3" />
                                        <SkeletonBox className="skeleton h-[10px] w-full" />
                                        <SkeletonBox className="skeleton h-[10px] w-full" />
    
                                        <SkeletonBox className="skeleton h-[10px] w-full" />
                                        <SkeletonBox className="skeleton h-[10px] w-full" />
    
                                        <SkeletonBox className="skeleton h-[10px] w-2/3" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <SkeletonBox className="skeleton h-[25px] w-1/3" />
                                        <SkeletonBox className="skeleton h-[25px] w-1/3" />
                                        <SkeletonBox className="skeleton h-[25px] w-1/3" />
                                    </div>
                                    <div className="flex flex-row justify-end gap-4">
                                        <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
                                    </div>
                                </div>
                            ))}
                        </div>
  )
}