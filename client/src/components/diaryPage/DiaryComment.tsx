import { DiaryReply } from "@/app/(app-pages)/diary/page"
import { useEffect, useState } from "react"
import Image from "next/image"
import defaultAvatrar from "../../../public/avatarImage.jpeg"

type DiaryCommentProps = {
    comment: DiaryReply
}

type User = {
    userId: string
    userAvatar: string
    userName: string
}

const userData = {
    userId: "user2",
    userAvatar: "",
    userName: "Filip2",
}

const DiaryComment: React.FC<DiaryCommentProps> = ({ comment }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUser() {
            try {
                setUser(userData)
            } catch (error) {
                console.error("Failed to fetch user info", error)
            } finally {
                setLoading(false)
            }
        }
        loadUser()
    }, [comment.creatorId])

    if (loading) {
        return (
            <div className="flex animate-pulse items-center gap-2 p-2">
                <div className="h-6 w-6 rounded-full bg-gray-300" />
                <div className="h-4 w-1/3 rounded bg-gray-300" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-row gap-2">
                    <div className="h-[26px] w-[26px] overflow-clip rounded-sm">
                        {user?.userAvatar ? (
                            <Image
                                src={user.userAvatar}
                                alt="avatar"
                                height={26}
                                width={26}
                            ></Image>
                        ) : (
                            <Image
                                src={defaultAvatrar}
                                alt="avatar"
                                height={26}
                                width={26}
                            ></Image>
                        )}
                    </div>

                    <span className="text-base font-medium text-[#2D3748]">
                        {user?.userName}
                    </span>
                </div>
                <p className="text-sm font-normal text-[#757575]">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </div>
            <p className="text-sm font-normal text-[#A0AEC0]">
                {comment.content}
            </p>
        </div>
    )
}

export default DiaryComment
