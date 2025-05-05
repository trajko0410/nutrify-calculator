"use client"

import { DiaryEntry } from "@/app/(app-pages)/diary/page"
import { useDiaryPageCtx } from "./diaryPageProvider"
import { useEffect, useState } from "react"
import DiaryPost from "./DiaryPost"

type diaryEntriesProps ={
  diaryEntries: DiaryEntry[]
}

const DiaryClientWrapper:React.FC<diaryEntriesProps>=({diaryEntries})=>{
  console.log(diaryEntries)
  const {entries, setEntries} = useDiaryPageCtx()
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (diaryEntries) {
      setEntries(diaryEntries);
    } else {
      setEntries([]);
    }
    setIsLoading(false); // kada završi setovanje

  }, [diaryEntries, setEntries]); 

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
   Loading
      </div>
    );
  }

  if (!entries.length) {
    return <div className="text-gray-500 text-center mt-4">Nema unosa u dnevniku.</div>;
  }


  return  (<div className="flex flex-col gap-4">
  {entries.map((entry) => (
    <div key={entry.id} className="shadow-Combined font-Poppins flex min-h-[300px] w-full flex-col gap-4 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black">
      <DiaryPost DiaryPostProps={entry}/>
    
    </div>
     
  ))}
</div>
);
  
}

export default DiaryClientWrapper