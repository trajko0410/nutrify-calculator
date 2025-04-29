
import { DiaryEntry } from "@/app/(app-pages)/diary/page"
import { useEffect, useState } from "react"
import DiaryComment from "./DiaryComment"
import Image from "next/image"
import defaultAvatrar from "../../../public/avatarImage.jpeg"


type DiaryPostProps={
  DiaryPostProps: DiaryEntry
}

type user={
  userId: string,
  userAvatar: string,
  userName: string
}

const userInfo = {
  userId: "user1",
  userAvatar: "",
  userName: "Filip"
}



const DiaryPost:React.FC<DiaryPostProps> = ({DiaryPostProps})=>{
  console.log(DiaryPostProps.authorId)
  const [user, setUser]=useState<user | null>( null)
  const [loading, setLoading] = useState(true);


  useEffect(()=>{

    setLoading(true)
    //fetch user1 info
    setUser(userInfo)
    setLoading(false)

  },[setUser, userInfo])

  if(loading){
    return(
      <div className="flex flex-col gap-4">
      Loading
         </div>
    )
  }


  return(
    <>
    <div>
            {user?.userAvatar ? (
                          <Image
                              src={user.userAvatar}
                              alt="avatar"
                              height={40}
                              width={40}
                          ></Image>
                      ) : (
                          <Image
                              src={defaultAvatrar}
                              alt="avatar"
                              height={40}
                              width={40}
                          ></Image>
                      )}
      
    </div>
    <h2 className="text-xl font-semibold text-gray-800">{DiaryPostProps.title}</h2>
    <p className="mt-2 text-gray-600">{DiaryPostProps.content}</p>
    <p className="mt-1 text-xs text-gray-400">Objavljeno: {new Date(DiaryPostProps.createdAt).toLocaleDateString()}</p>

    <div className="mt-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Komentari:</h3>
   
          {DiaryPostProps.diaryComments.length > 0 ? (
            DiaryPostProps.diaryComments.map((comment) => (
              <DiaryComment key={comment.commentId} comment={comment} />
            ))
        
      ) : (
        <div className="text-gray-400 text-sm">Nema komentara još uvek.</div>
      )}
    </div>
  </>
  )
}

export default DiaryPost