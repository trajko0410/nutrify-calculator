import { DiaryEntry } from "@/app/(app-pages)/diary/page"
import { useEffect, useState } from "react"
import DiaryComment from "./DiaryComment"
import Image from "next/image"
import defaultAvatrar from "../../../public/avatarImage.jpeg"
import { DownloadSimple } from "@phosphor-icons/react"

import pdfImage from "../../../public/pdfImage.png"
import DiaryCommentForm from "./commentForm"

type DiaryPostProps = {
    DiaryPostProps: DiaryEntry
}

type user = {
    userId: string
    userAvatar: string
    userName: string
}

const userInfo = {
    userId: "user1",
    userAvatar: "",
    userName: "Filip",
}

const DiaryPost: React.FC<DiaryPostProps> = ({ DiaryPostProps }) => {
    console.log(DiaryPostProps.authorId)
    const [user, setUser] = useState<user | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        //fetch user1 info
        setUser(userInfo)
        setLoading(false)
    }, [setUser])

    if (loading) {
        return <div className="flex flex-col gap-4">Loading</div>
    }

    return (
        <>
            <div className="flex flex-row gap-4">
                <div className="overflow-clip rounded-lg">
                    {user?.userAvatar ? (
                        <Image
                            src={user.userAvatar}
                            alt="avatar"
                            height={54}
                            width={54}
                        ></Image>
                    ) : (
                        <Image
                            src={defaultAvatrar}
                            alt="avatar"
                            height={54}
                            width={54}
                        ></Image>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-medium text-[#2D3748]">
                        {user?.userName ?? "Our nutrcionist"}
                    </h3>
                    <p className="text-sm font-normal text-[#757575]">
                        {new Date(DiaryPostProps.createdAt).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            },
                        )}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-medium text-[#2D3748]">
                    {DiaryPostProps.title}
                </h2>
                <p className="text-sm font-normal text-[#A0AEC0]">
                    {DiaryPostProps.content}
                </p>
            </div>

            {DiaryPostProps.file && (
                <a
                    href={DiaryPostProps.file}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-fit flex-row items-center gap-2"
                >
                    <Image
                        src={pdfImage}
                        alt="pdfImage"
                        width={20}
                        height={24}
                    ></Image>
                    <h4 className="text-xs font-normal text-[#2D3748]">
                        {DiaryPostProps.file}
                    </h4>
                    <DownloadSimple color="black" size={12} />
                </a>
            )}

            <div className="h-[1px] w-[100%] items-center bg-[#D9D9D9]"></div>

            <div className="flex flex-col gap-6">
                <h3 className="text-lg font-medium text-[#2D3748]">Answers:</h3>

                {DiaryPostProps.diaryComments.length > 0 ? (
                    DiaryPostProps.diaryComments.map((comment) => (
                        <div key={comment.commentId}>
                            <DiaryComment
                                key={comment.commentId}
                                comment={comment}
                            />
                            <div className="mt-4 h-[1px] w-[100%] items-center bg-[#D9D9D9]"></div>
                        </div>
                    ))
                ) : (
                    <>
                        <div className="text-sm font-normal text-[#A0AEC0]">
                            No comments for this post.
                        </div>
                        <div className="h-[1px] w-[100%] items-center bg-[#D9D9D9]"></div>
                    </>
                )}
            </div>
            <DiaryCommentForm
                authorId={user?.userId}
                postId={DiaryPostProps.id}
            />
        </>
    )
}

export default DiaryPost
