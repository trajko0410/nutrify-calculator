import SkeletonBox from "../util/SkeletonLoading"

type nutricionistEducationOrContactLoaderProps = {
  showType: string
}

const NutrtionistEducationOrContactLoader:React.FC<nutricionistEducationOrContactLoaderProps> =({showType})=>{
  return(
     <div className="shadow-Combined font-Poppins flex h-full flex-col gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px]">
                    {showType === "contact" ? (
                        <div className="flex h-full w-full flex-col justify-between gap-8">
                            <div className="flex flex-col gap-2">
                                <SkeletonBox className="skeleton mb-2 h-[10px] w-1/3" />
                                <SkeletonBox className="skeleton h-[10px] w-full" />
                            </div>
                            <div className="flex flex-row justify-between gap-4">
                                <SkeletonBox className="skeleton h-[25px] w-1/3"></SkeletonBox>
                                <SkeletonBox className="skeleton h-[25px] w-1/3"></SkeletonBox>
                                <SkeletonBox className="skeleton h-[25px] w-1/3"></SkeletonBox>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-full w-full flex-col justify-between gap-8">
                            <div className="flex flex-col gap-2">
                                <SkeletonBox className="skeleton mb-2 h-[10px] w-1/3" />
                                <SkeletonBox className="skeleton h-[10px] w-full" />
                            </div>
                            <div className="flex flex-row justify-between gap-4">
                                <SkeletonBox className="skeleton h-[25px] w-2/3"></SkeletonBox>
                            </div>
                        </div>
                    )}
                </div>
  )
}

export default NutrtionistEducationOrContactLoader