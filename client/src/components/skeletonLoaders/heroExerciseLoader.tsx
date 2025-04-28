import SkeletonBox from "../util/SkeletonLoading"

export default function HeroExerciseLoader() {
    return (
        <div className="shadow-Combined font-Poppins flex min-h-[300px] w-full flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black">
            <SkeletonBox className="skeleton h-[300px] w-full" />
            <div className="md: flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex w-1/3 flex-col gap-2">
                    <SkeletonBox className="skeleton h-[10px] w-2/3" />
                    <SkeletonBox className="skeleton h-[10px] w-full" />
                </div>
                <div className="flex w-full flex-col gap-2 md:w-1/3">
                    <SkeletonBox className="skeleton h-[25px] w-full" />
                </div>
            </div>
        </div>
    )
}
