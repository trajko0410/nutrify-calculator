import SkeletonBox from "../util/SkeletonLoading";

export default function ExerciseDescriptionLoader(){
  return(
     <div className="shadow-Combined font-Poppins flex h-full w-full flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black">
                    <div className="flex w-full flex-col gap-4">
                        <div className="flex w-full flex-col gap-2">
                            <SkeletonBox className="skeleton h-[10px] w-1/3 mb-2" />
                            <SkeletonBox className="skeleton h-[10px] w-full" />
                            <SkeletonBox className="skeleton h-[10px] w-full" />
                            <SkeletonBox className="skeleton h-[10px] w-full" />
                            <SkeletonBox className="skeleton h-[10px] w-full" />
                        </div>
                        <div className="flex w-full flex-col gap-2 pl-4">
                            <SkeletonBox className="skeleton h-[10px] w-1/3" />
                            <SkeletonBox className="skeleton mb-2 h-[10px] w-full" />
                            <SkeletonBox className="skeleton h-[10px] w-1/3" />
                            <SkeletonBox className="skeleton mb-2 h-[10px] w-full" />
                            <SkeletonBox className="skeleton h-[10px] w-1/3" />
                            <SkeletonBox className="skeleton h-[10px] w-full" />
                            <SkeletonBox className="skeleton h-[10px] w-full" />
                        </div>
                    </div>
                </div>
  )
}