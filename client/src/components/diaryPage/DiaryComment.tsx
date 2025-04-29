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
        <div className="border-t p-2 text-sm text-gray-600">
            <div className="mb-1 flex items-center gap-2">
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

                <span className="text-xs font-medium text-gray-700">
                    {user?.userName}
                </span>
            </div>
            {comment.content}
            <div className="text-[10px] text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()}
            </div>
        </div>
    )
}

export default DiaryComment
