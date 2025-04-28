import SkeletonBox from "../util/SkeletonLoading"

const FoodIntakeLoader = () => {
    return (
        <div className="shadow-Combined font-Poppins flex min-h-[80px] flex-1/4 flex-row items-center justify-between gap-2 rounded-xl bg-[#FFFFFF] py-[10px] pr-[20px] pl-[20px]">
            <div className="flex w-full flex-col gap-4">
                <SkeletonBox className="skeleton h-[10px] w-1/3 rounded-sm" />
                <SkeletonBox className="skeleton h-[10px] w-full rounded-sm" />
            </div>
            <div className="">
                <SkeletonBox className="skeleton h-[40px] w-[40px] rounded-sm" />
            </div>
        </div>
    )
}

export default FoodIntakeLoader
