"use client"

import { DiaryEntry } from "@/app/(app-pages)/diary/page"
import { createContext, useContext, useState, ReactNode } from "react"

type DiaryPageProviderType = {
    entries: DiaryEntry[] | []
    setEntries: (entries: DiaryEntry[] | []) => void
}

const DiaryPageContext = createContext<DiaryPageProviderType | undefined>(
    undefined,
)

export const DiaryPageCtxProvider = ({ children }: { children: ReactNode }) => {
    const [entries, setEntries] = useState<DiaryEntry[] | []>([])
    return (
        <DiaryPageContext.Provider value={{ entries, setEntries }}>
            {children}
        </DiaryPageContext.Provider>
    )
}

export const useDiaryPageCtx = () => {
    const context = useContext(DiaryPageContext)

    if (context === undefined) {
        throw new Error(
            "useDiaryPageCtx must be used within a DiaryPageCtxProvider",
        )
    }
    return context
}
