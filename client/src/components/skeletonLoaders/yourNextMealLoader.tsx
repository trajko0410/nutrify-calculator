import SkeletonBox from "../util/SkeletonLoading"

export default function YourNextMealLoader() {
    return (
        <div className="shadow-Combined font-Poppins flex h-full flex-col-reverse justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
            <div className="flex w-full md:w-3/5 flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <SkeletonBox className="skeleton mb-2 h-[10px] w-1/3" />
                    <SkeletonBox className="skeleton h-[10px] w-full" />
                    <SkeletonBox className="skeleton h-[10px] w-full" />
                    <SkeletonBox className="skeleton h-[10px] w-full" />
                    <SkeletonBox className="skeleton h-[10px] w-full" />
                </div>
                <div className="flex flex-row justify-between gap-4">
                    <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
                    <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
                </div>
            </div>
            <div className="flex w-full justify-center md:w-2/5">
                <SkeletonBox className="skeleton h-full min-h-[250px] w-full" />
            </div>
        </div>
    )
}
