import SkeletonBox from "../util/SkeletonLoading";

export default function DatePickerLoader(){
  return(
    <div className="shadow-Combined font-Poppins flex h-[60px] w-full  items-center justify-center gap-2 rounded-xl bg-[#FFFFFF] p-[10px] lg:h-fit">
    <div className="lg:flex lg:flex-col hidden gap-2 w-full ">
        <SkeletonBox className="skeleton h-[10px] w-full" />
        <SkeletonBox className="skeleton h-[200px] w-full" />
    </div>
    <div className="lg:hidden lg:flex-row flex gap-2 w-full items-center justify-center ">
        <SkeletonBox className="skeleton h-[25px] w-1/3" />
    </div>
</div>
  )
}