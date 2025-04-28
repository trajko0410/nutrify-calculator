import SkeletonBox from "../util/SkeletonLoading";

export default function AboutNutritionLoader(){
  return(
      <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] md:flex-row">
                    <div className="flex w-full justify-center md:w-2/5">
                        <SkeletonBox className="skeleton h-full min-h-[250px] w-full" />
                    </div>
                    <div className="flex w-full flex-col justify-between gap-4 md:w-3/5">
                        <div className="flex w-full justify-between">
                            <div className="flex w-3/5 flex-col gap-2">
                                <SkeletonBox className="skeleton h-[10px] w-1/3" />
                                <SkeletonBox className="skeleton h-[10px] w-full" />
                            </div>
                            <div className="flex w-1/5">
                                <SkeletonBox className="skeleton h-[25px] w-full"></SkeletonBox>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <SkeletonBox className="skeleton h-[10px] w-1/5" />
                            <SkeletonBox className="skeleton h-[10px] w-full" />
                            <SkeletonBox className="skeleton h-[10px] w-full" />
                            <SkeletonBox className="skeleton h-[10px] w-full" />
                            <SkeletonBox className="skeleton h-[10px] w-full" />
                        </div>
                        <div className="flex flex-row justify-between gap-4">
                            <SkeletonBox className="skeleton h-[25px] w-1/3"></SkeletonBox>
                            <SkeletonBox className="skeleton h-[25px] w-1/3"></SkeletonBox>
                            <SkeletonBox className="skeleton h-[25px] w-1/3"></SkeletonBox>
                        </div>
                    </div>
                </div>
  )
}