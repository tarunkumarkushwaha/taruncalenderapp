"use client"
import React, { useState } from "react";
import { useAppContext } from "@/context/AuthContext";
import Modal from "./Modal";

const Calender = () => {
    const [Modalopen, setModalopen] = useState(false)
    const {
        events,
        searchResults,
        days,
        currentMonth,
        currentYear,
        handleDayClick,
        handleDragStart,
        handleDrop,
        handleDragOver,
        handlePreviousMonth,
        handleNextMonth,
    } = useAppContext();

    return (
        <div className="p-4 smooth-entry min-h-[85vh]">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePreviousMonth}
                    className="px-4 py-2 bg-gray-200 text-black rounded"
                >
                    Previous
                </button>
                <h1 className="text-xl font-bold">
                    {new Date(currentYear, currentMonth).toLocaleString("default", {
                        month: "long",
                    })} {currentYear}
                </h1>
                <button
                    onClick={handleNextMonth}
                    className="px-4 py-2 bg-gray-200 text-black rounded"
                >
                    Next
                </button>
            </div>

            <div className="p-10 w-full md:w-2/3 mx-auto bg-slate-200 rounded-md">
                <div className="grid grid-cols-7 gap-2 ">
                    {days.map((day) => {
                        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
                        return (
                            <div
                                key={day}
                                className="border bg-slate-50 border-slate-500 rounded md:p-3 p-1 cursor-pointer hover:bg-slate-300"
                                onClick={() => {
                                    handleDayClick(day)
                                    setModalopen(true)
                                }}
                                onDrop={(e) => handleDrop(e, dateKey)}
                                onDragOver={handleDragOver}
                            >
                                <span
                                    className="block text-center font-bold text-slate-800">{day}</span>
                                {(events[dateKey] || []).length > 0 && (
                                    <span
                                        draggable
                                        onDragStart={(e) => {
                                            handleDragStart(e, event, dateKey)}}
                                        className="block text-center text-xs text-green-500">Events</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* search results of  */}

            {searchResults.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-lg font-bold">Search Results</h2>
                    <ul>
                        {searchResults.map((result, index) => (
                            <li key={index} className="mb-2">
                                <span className="text-gray-800">{result.event}</span> on {result.date}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <Modal isOpen={Modalopen} onClose={() => setModalopen(false)} />
        </div>
    );
};

export default Calender;
