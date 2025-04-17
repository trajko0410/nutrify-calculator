import SkeletonBox from "../util/SkeletonLoading"

export default function VitaminsContentLoader() {
    return (
        <div className="shadow-Combined font-Poppins flex h-full flex-col justify-between gap-8 rounded-xl bg-[#ffffff] px-[20px] py-[17px] text-black">
            <div className="flex h-full w-full flex-col justify-between gap-4">
                <div className="flex flex-row items-center justify-between gap-4">
                    <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
                    <SkeletonBox className="skeleton h-[25px] w-1/3"></SkeletonBox>
                </div>

                <div>
                    <SkeletonBox className="skeleton h-[20px] w-1/3"></SkeletonBox>
                </div>
                <div className="flex flex-col gap-4">
                    <SkeletonBox className="skeleton h-[10px] w-full"></SkeletonBox>
                    <SkeletonBox className="skeleton h-[10px] w-full"></SkeletonBox>
                    <SkeletonBox className="skeleton h-[10px] w-full"></SkeletonBox>
                    <SkeletonBox className="skeleton h-[10px] w-full"></SkeletonBox>
                    <SkeletonBox className="skeleton h-[10px] w-full"></SkeletonBox>
                    <SkeletonBox className="skeleton h-[10px] w-full"></SkeletonBox>
                </div>
            </div>
        </div>
    )
}
