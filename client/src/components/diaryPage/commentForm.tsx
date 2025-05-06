"use client"

import { useState } from "react"
import { TextField } from "@mui/material"
import { useDiaryPageCtx } from "./diaryPageProvider"
import { UploadSimple } from "@phosphor-icons/react"

type DiaryCommentFormProps = {
    authorId: string | undefined
    postId: string
}

const DiaryCommentForm: React.FC<DiaryCommentFormProps> = ({
    authorId,
    postId,
}) => {
    const { addDiaryComment } = useDiaryPageCtx()
    const [content, setContent] = useState("")
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!content.trim()) return

        const formData = new FormData()
        formData.append("content", content)
        formData.append("creatorId", authorId ? authorId : "Unkown")
        formData.append("createdAt", new Date().toISOString())
        if (file) {
            formData.append("file", file)
        }

        console.log("FormData entries:", formData)

        // Add to context (locally) so it appears immediately
        const localComment = {
            commentId: crypto.randomUUID(),
            content: formData.get("content") as string,
            creatorId: formData.get("creatorId") as string,
            createdAt: new Date(formData.get("createdAt") as string),
            file: file ? URL.createObjectURL(file) : undefined,
        }

        addDiaryComment(postId, localComment)

        setContent("")
        setFile(null)
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="font-Poppins flex flex-col gap-4 rounded-md sm:flex-row sm:items-center sm:justify-between"
            >
                <TextField
                    label="Enter your comment here..."
                    multiline
                    variant="standard"
                    rows={1}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    sx={{
                        "& .MuiInputBase-root": {
                            color: "#897E7A",
                            fontWeight: 500,
                            fontSize: "14px",
                        },
                        "& .MuiInputLabel-root": {
                            color: "#897E7A",
                            fontWeight: 500,
                            fontSize: "14px",
                        },
                        "& .MuiInput-underline:before": {
                            borderBottomColor: "#897E7A",
                        },
                        "& .MuiInput-underline:hover:not(.Mui-disabled):before":
                            {
                                borderBottomColor: "#897E7A",
                            },
                    }}
                />

                <label
                    htmlFor="upload-pdf"
                    className="flex h-10 w-full max-w-[140px] min-w-[80px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#EEEBDA] px-4 py-2 transition duration-200 hover:bg-[#E0DCCA] sm:w-[140px]"
                >
                    <input
                        type="file"
                        id="upload-pdf"
                        accept=".pdf"
                        onChange={(e) => {
                            const selected = e.target.files?.[0]
                            if (
                                selected &&
                                selected.type === "application/pdf"
                            ) {
                                setFile(selected)
                            } else {
                                setFile(null)
                            }
                        }}
                        className="hidden"
                    />
                    <UploadSimple size={18} color="#00473C" />
                    <span className="text-DarkGreen text-sm font-medium">
                        File
                    </span>
                </label>

                <button
                    type="submit"
                    className="bg-LightGreen flex h-10 w-full max-w-[140px] min-w-[80px] items-center justify-center gap-2 rounded-lg px-4 py-2 sm:w-[140px]"
                >
                    <p className="text-DarkGreen text-sm font-medium">Reply</p>
                </button>
            </form>
            {file && (
                <div className="mt-1 flex max-w-[200px] items-center gap-2">
                    <p className="truncate text-xs text-[#6B6B6B] italic">
                        {file.name}
                    </p>
                    <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-xs font-bold text-red-500 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            )}
        </>
    )
}

export default DiaryCommentForm
