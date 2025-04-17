import SkeletonBox from "../util/SkeletonLoading";

export default function TodayTimelineLoader() {return(
          <div className="shadow-Combined font-Poppins flex h-full flex-col justify-between gap-8 overflow-clip rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black p-4">
                  <div className="flex flex-row items-center justify-between gap-4">
                      <SkeletonBox className="skeleton h-[10px] w-1/5"></SkeletonBox>
                      <SkeletonBox className="skeleton h-[25px] w-2/5"></SkeletonBox>
                  </div>
                  <div className="flex h-full w-[370px] flex-row justify-between gap-4">
                      <div className="flex w-[370px] flex-col gap-2">
                          <div className="flex flex-col gap-2">
                              <SkeletonBox className="skeleton h-[150px] w-[370px]" />
                              <SkeletonBox className="skeleton h-[10px] w-full" />
                              <SkeletonBox className="skeleton h-[10px] w-full" />
                          </div>
  
                          <div className="flex justify-between gap-4">
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                          </div>
  
                          <div className="flex flex-row justify-between gap-4">
                              <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
                          </div>
                      </div>
                      <div className="flex w-[370px] flex-col gap-2">
                          <div className="flex flex-col gap-2">
                              <SkeletonBox className="skeleton h-[150px] w-[370px]" />
                              <SkeletonBox className="skeleton h-[10px] w-full" />
                              <SkeletonBox className="skeleton h-[10px] w-full" />
                          </div>
  
                          <div className="flex justify-between gap-4">
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                          </div>
  
                          <div className="flex flex-row justify-between gap-4">
                              <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
                          </div>
                      </div>
                      <div className="flex w-[370px] flex-col gap-2">
                          <div className="flex flex-col gap-2">
                              <SkeletonBox className="skeleton h-[150px] w-[370px]" />
                              <SkeletonBox className="skeleton h-[10px] w-full" />
                              <SkeletonBox className="skeleton h-[10px] w-full" />
                          </div>
  
                          <div className="flex justify-between gap-4">
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/6"></SkeletonBox>
                          </div>
  
                          <div className="flex flex-row justify-between gap-4 ">
                              <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
                              <SkeletonBox className="skeleton h-[10px] w-1/3"></SkeletonBox>
                          </div>
                      </div>
                  </div>
              </div>
)}