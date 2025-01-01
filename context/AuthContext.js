"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [events, setEvents] = useState({}); // Store events by dates
  const [selectedDate, setSelectedDate] = useState('2024-12-1');
  const [modalContent, setModalContent] = useState({ type: "add", event: "", category: "" });
  const [searchQuery, setSearchQuery] = useState(""); // For search query
  const [searchResults, setSearchResults] = useState({}); // search result
  useEffect(() => {
    // Save events to local storage whenever they change
    if (Object.keys(events).length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events, selectedDate]);

  useEffect(() => {
    // Load events from local storage on initial render
    const data = localStorage.getItem("events");
    if (data) {
      try {
        setEvents(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse events from localStorage", e);
        setEvents({});
      }
    }
  }, []);


  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const handleDayClick = (day) => {
    const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
    setSelectedDate(dateKey);
  };

  const handleAddEvent = () => {
    setEvents({
      ...events,
      [selectedDate]: [...(events[selectedDate] || []), {
        name: modalContent.event,
        category: modalContent.category,
      }],
    });
    setModalContent({ type: "add", event: "", category: "" });
  };

  const handleEditEvent = (index) => {
    if (events[selectedDate] && events[selectedDate][index]) {
      const event = events[selectedDate][index];
      setModalContent({ type: "edit", event: event.name, category: event.category, index });
    }
  };

  const handleSaveEdit = () => {
    if (events[selectedDate]) {
      const updatedEvents = [...events[selectedDate]];
      updatedEvents[modalContent.index] = { name: modalContent.event, category: modalContent.category };
      setEvents({ ...events, [selectedDate]: updatedEvents });
      setModalContent({ type: "add", event: "", category: "" });
    }
  };

  const handleDeleteEvent = (index) => {
    if (events[selectedDate]) {
      const updatedEvents = events[selectedDate].filter((_, i) => i !== index);
      // console.log(index)
      const updatedEventsObject = { ...events };

      // Update or remove the date key
      if (updatedEvents.length > 0) {
        updatedEventsObject[selectedDate] = updatedEvents;
      } else {
        delete updatedEventsObject[selectedDate];
      }
      localStorage.setItem("events", JSON.stringify(updatedEventsObject));
      setEvents(updatedEventsObject);
    }

  };

  const handleSearch = (input) => {
    const results = {}; 
    if (input === "") {
      setSearchResults(results);
      return;
    }
  
    for (const date in events) {
      events[date].forEach((event) => {
        if (event.name.toLowerCase().includes(input.toLowerCase())) {
          // Check if the date already exists in results
          if (!results[date]) {
            results[date] = [];
          }
          results[date].push({
            name: event.name,
            category: event.category,
          });
        }
      });
    }
  
    setSearchResults(results);
  };
  

  const handleDragStart = (event, draggedEvent, dateKey) => {
    event.dataTransfer.setData(
      "eventData",
      JSON.stringify({ draggedEvent, dateKey })
    );
  };

  const handleDrop = (event, targetDate) => {
    event.preventDefault();
    const { draggedEvent, dateKey } = JSON.parse(
      event.dataTransfer.getData("eventData")
    );
    const updatedSourceEvents = events[dateKey]
    setEvents({
      ...events,
      [dateKey]: "",
      [targetDate]: updatedSourceEvents,
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const days = Array.from(
    { length: daysInMonth(currentYear, currentMonth) },
    (_, i) => i + 1
  );

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <Context.Provider
      value={{
        events,
        setEvents,
        selectedDate,
        setSelectedDate,
        modalContent,
        setModalContent,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        currentMonth,
        setCurrentMonth,
        currentYear,
        setCurrentYear,
        days,
        handleDayClick,
        handleAddEvent,
        handleEditEvent,
        handleSaveEdit,
        handleDeleteEvent,
        handleSearch,
        handleDragStart,
        handleDrop,
        handleDragOver,
        handlePreviousMonth,
        handleNextMonth,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
