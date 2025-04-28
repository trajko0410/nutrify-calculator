import SkeletonBox from "../util/SkeletonLoading";

export default function GrocerysForNextMealLoader() {
  return(
    <div className="shadow-Combined font-Poppins flex h-full flex-col justify-between gap-8 rounded-xl bg-[#ffffff] px-[20px] py-[17px] text-black">
    <div className="flex h-full w-full flex-col justify-between gap-4">
        <div className="flex flex-row items-center justify-between gap-4">
            <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
            <SkeletonBox className="skeleton h-[25px] w-1/3"></SkeletonBox>
        </div>

        <div className="mt-6 mb-4 flex flex-row justify-between gap-4">
            <div className="flex w-full justify-start">
                <SkeletonBox className="skeleton h-[20px] w-1/3"></SkeletonBox>
            </div>
            <div className=" w-full justify-start hidden sm:flex">
                <SkeletonBox className="skeleton h-[20px] w-1/3"></SkeletonBox>
            </div>
            <div className=" w-full justify-start hidden sm:flex">
                <SkeletonBox className="skeleton h-[20px] w-2/3 sm:w-1/3"></SkeletonBox>
            </div>
        </div>

        <div className="flex flex-row justify-between gap-4">
            <SkeletonBox className="skeleton h-[10px] w-full sm:w-1/3"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
        </div>
        <div className="flex flex-row justify-between gap-4">
            <SkeletonBox className="skeleton h-[10px] w-full sm:w-1/3"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
            
        </div>
        <div className="flex flex-row justify-between gap-4">
            <SkeletonBox className="skeleton h-[10px] w-full  sm:w-1/3"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
            
        </div>
        <div className="flex flex-row justify-between gap-4">
            <SkeletonBox className="skeleton h-[10px] w-full sm:w-1/3"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
            
        </div>
        <div className="flex flex-row justify-between gap-4">
            <SkeletonBox className="skeleton h-[10px] w-full sm:w-1/3"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
            
        </div>
        <div className="flex flex-row justify-between gap-4">
            <SkeletonBox className="skeleton h-[10px] w-full sm:w-1/3"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
            <SkeletonBox className="skeleton h-[10px] w-1/3 hidden sm:block"></SkeletonBox>
            
        </div>
    </div>
</div>
  )
}