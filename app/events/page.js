"use client";
import React, { useState } from "react";
import { useAppContext } from "@/context/AuthContext";
import Modal from "@/components/Modal";

const EventPage = () => {
  const {
    events,
    setSearchResults,
    searchResults,
    setSelectedDate,
  } = useAppContext();
  const [modalopen, setmodalopen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // console.log(searchResults)

  const filterEventsByCategory = (eve, category) => {
    
    if (category === "all") return events;
    const filteredEvents = {};
    Object.keys(eve).forEach((date) => {
      const filtered = eve[date] && eve[date].filter((event) => event.category === category);
      if (filtered.length > 0) {
        filteredEvents[date] = filtered;
      }
    });
    return filteredEvents;
  };

  const filterEventsBySearch = (eve, category) => {
    if (category === "all") return eve;

    const filteredEvents = {};
    Object.keys(eve).forEach((date) => {
      const filtered = eve[date] && eve[date].filter((event) => event.category === category);
      if (filtered.length > 0) {
        filteredEvents[date] = filtered;
      }
    });
    return filteredEvents;
  };

  const filteredEvents =
     Object.keys(searchResults).length > 0 
    ? filterEventsBySearch(searchResults, selectedCategory)  
    :
    filterEventsByCategory(events, selectedCategory)

  // console.log(searchResults, "log")

  return (
    <>
      <div className="container text-black mx-auto p-4 smooth-entry min-h-[85vh]">
        <h1 className="text-2xl text-center text-sky-800 font-bold ">Events</h1>

        {/* Category Filter */}
        <div className="flex justify-end mb-4 ">
          <label className="mr-2 text-lg font-medium">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded text-sm"
          >
            <option value="all">All</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Events List */}
        <div className="grid gap-4 bg-white rounded-lg">
          {Object.keys(filteredEvents).length > 0 && Object.keys(filteredEvents).map((date) => (
            <div key={date} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold mb-2">{date}</h2>
              <ul>
                {filteredEvents[date] && filteredEvents[date].map((event, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center mb-2 p-2  rounded-md "
                  >
                    <span
                      className={`text-gray-800 min-w-60 bg-slate-200 border-2 text-xl px-4 py-1 rounded-md ${event.category === "work"
                        ? "border-red-500"
                        : event.category === "personal"
                          ? "border-green-500"
                          : "border-blue-500"
                        }`}
                    >
                      {index + 1}. {event.name}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedDate(date);
                          setmodalopen(true);
                        }}
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                      >
                        Modify
                      </button>

                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Modal isOpen={modalopen} onClose={() => setmodalopen(false)} />
      </div>
    </>
  );
};

export default EventPage;