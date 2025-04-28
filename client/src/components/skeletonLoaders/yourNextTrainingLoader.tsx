import SkeletonBox from "../util/SkeletonLoading";

export default function YourNextTrainingLoader() {
  return(
    <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
    <div className="flex w-full h-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
            <SkeletonBox className="skeleton mb-2 h-[10px] w-1/3" />
            <SkeletonBox className="skeleton h-[10px] w-full" />
            <SkeletonBox className="skeleton h-[10px] w-full" />
            <SkeletonBox className="skeleton h-[10px] w-full" />
        </div>
        <div className="flex flex-row justify-between gap-4">
            <SkeletonBox className="skeleton h-[20px] w-1/3"></SkeletonBox>
            <SkeletonBox className="skeleton h-[20px] w-1/3"></SkeletonBox>
            <SkeletonBox className="skeleton h-[20px] w-1/3"></SkeletonBox>
        </div>
        <div className="flex flex-row justify-between gap-4">
            <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
        </div>
    </div>
</div>
  )
}