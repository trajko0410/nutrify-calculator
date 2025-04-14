"use client"

import React, { useState, useEffect } from "react"
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { CaretRight } from "@phosphor-icons/react"

const DatePicker = () => {
    const [isClient, setIsClient] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null
    }

    const handlePrevDay = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(selectedDate.getDate() - 1)
        setSelectedDate(newDate)
    }

    const handleNextDay = () => {
        const newDate = new Date(selectedDate)
        newDate.setDate(selectedDate.getDate() + 1)
        setSelectedDate(newDate)
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="shadow-Combined font-Poppins flex h-[60px] w-full min-w-[200px] items-center justify-center gap-2 rounded-xl bg-[#FFFFFF] p-[10px] lg:h-fit">
                <div className="hidden items-start justify-center overflow-hidden lg:flex">
                    <DateCalendar
                        showDaysOutsideCurrentMonth
                        openTo="day"
                        sx={{
                            width: "fit-content",
                            transform: "scale(0.95)",
                            fontFamily: "Poppins",
                            color: "#2D3748",
                            padding: "0px",
                            margin: "0px",
                            height: "fit-content",

                            "& .MuiPickersSlideTransition-root": {
                                minHeight: "auto !important",
                                height: "192px",
                            },

                            "& .MuiPickersCalendarHeader-root": {
                                marginTop: 0,
                                paddingTop: 0,
                                paddingLeft: "12px",
                            },

                            transformOrigin: "top center",
                            "& .Mui-selected": {
                                backgroundColor: "#00B011",
                                color: "#fff",
                            },
                            "& .Mui-selected:hover": {
                                backgroundColor: " #D6F1A2",
                                color: "#fff",
                            },
                            "& .MuiPickersDay-root.Mui-selected": {
                                backgroundColor: "#00B011",

                                color: "#fff",
                            },
                            "& .MuiPickersDay-root.Mui-selected:hover": {
                                backgroundColor: "#00B011",
                            },
                            "& .MuiPickersDay-root:hover": {
                                backgroundColor: "rgba(0, 128, 0, 0.1)", // light green on hover
                            },
                            "& .MuiPickersDay-root.Mui-focusVisible": {
                                backgroundColor: "rgba(0, 128, 0, 0.2)", // green tint when keyboard navigating
                            },
                            // Selected year/month (year picker view)
                            "& .MuiPickersYear-yearButton.Mui-selected": {
                                backgroundColor: "#00B011",

                                color: "#fff",
                            },
                            "& .MuiPickersYear-yearButton.Mui-selected:hover": {
                                backgroundColor: "#2e7d32",
                            },
                            "& .MuiPickersYear-yearButton:hover": {
                                backgroundColor: "rgba(0, 128, 0, 0.1)",
                            },
                            "& .MuiPickersYear-yearButton:focus, & .MuiPickersYear-yearButton:active":
                                {
                                    backgroundColor: "#00B011",
                                    color: "#fff",
                                },
                            "& .MuiYearCalendar-root": {
                                maxWidth: "220px",
                                margin: "0 auto", // center it horizontally
                            },
                        }}
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                    />
                </div>

                <div className="flex w-full items-center justify-between p-6 lg:hidden">
                    <CaretRight
                        size={24}
                        weight="bold"
                        color="#2D3748"
                        onClick={handlePrevDay}
                        style={{
                            transform: "rotate(180deg)",
                            cursor: "pointer",
                        }}
                    />

                    <h3 className="text-center text-lg font-medium text-[#2D3748]">
                        {formatDate(selectedDate)}
                    </h3>

                    <CaretRight
                        color="#2D3748"
                        weight="bold"
                        size={24}
                        onClick={handleNextDay}
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </div>
        </LocalizationProvider>
    )
}

export default DatePicker