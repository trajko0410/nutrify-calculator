import SkeletonBox from "../util/SkeletonLoading";

export default function GrocerysForNextMealLoader() {
  return (
    <div className="shadow-Combined font-Poppins flex h-full w-full flex-col justify-between gap-2 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black">
    <div className="flex flex-row justify-between gap-4 mb-2 ">
                <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
                <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
            </div>
            <div className="flex">
              <SkeletonBox className="skeleton h-[150px] w-full mb-2" />
            </div>
            <div className="flex flex-row justify-between gap-4 ">
                <SkeletonBox className="skeleton h-[10px] w-1/4"></SkeletonBox>
                <SkeletonBox className="skeleton h-[10px] w-1/4"></SkeletonBox>
            </div>
            <div className="flex">
              <SkeletonBox className="skeleton h-[25px] w-full" />
            </div>
</div>
  )
}