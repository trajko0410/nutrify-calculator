"use client"

import { DiaryEntry, DiaryReply } from "@/app/(app-pages)/diary/page"
import { createContext, useContext, useState, ReactNode } from "react"

type DiaryPageProviderType = {
    entries: DiaryEntry[]
    setEntries: (entries: DiaryEntry[]) => void
    addDiaryComment: (entryId: string, comment: DiaryReply) => void
}

const DiaryPageContext = createContext<DiaryPageProviderType | undefined>(
    undefined,
)

export const DiaryPageCtxProvider = ({ children }: { children: ReactNode }) => {
    const [entries, setEntries] = useState<DiaryEntry[]>([])

    const addDiaryComment = (entryId: string, comment: DiaryReply) => {
        setEntries((prevEntries) =>
            prevEntries.map((entry) =>
                entry.id === entryId
                    ? {
                          ...entry,
                          diaryComments: [comment, ...entry.diaryComments],
                      }
                    : entry
            )
        )
    }

    return (
        <DiaryPageContext.Provider
            value={{
                entries,
                setEntries,
                addDiaryComment,
            }}
        >
            {children}
        </DiaryPageContext.Provider>
    )
}

export const useDiaryPageCtx = () => {
    const context = useContext(DiaryPageContext)

    if (context === undefined) {
        throw new Error(
            "useDiaryPageCtx must be used within a DiaryPageCtxProvider"
        )
    }

    return context
}
