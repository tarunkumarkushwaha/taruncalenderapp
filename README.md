# Event Manager Application

This repository contains an **Event Manager Application**, developed by me. The application allows users to manage events with features such as adding, editing, deleting, searching, and sorting events. Data persistence is handled through the browser's `localStorage`, ensuring user data remains available across sessions.

live link -  https://taruncalenderapp.vercel.app/

## Features

### 1. Event Management
- **Add Events**: Users can create new events by specifying details like event name and category (e.g., work, personal, etc.).
- **Edit Events**: Existing events can be edited directly from the Event Page.
- **Delete Events**: Events can be removed. If all events for a specific date are deleted, the date is automatically removed from the event list.

### 2. Search Functionality
- **Search by Event Name**: Users can search for events using a search bar. The results are displayed dynamically, showing the matching events.

### 3. Sorting
- **Sort by Category**: Events can be sorted based on their category, helping users quickly organize their tasks.

### 4. Data Persistence
- **LocalStorage Integration**: All event data is stored in `localStorage`, ensuring persistence across page reloads or browser restarts.

### 5. Drag-and-Drop Feature
- **Move Events Across Dates**: Users can drag and drop events between dates, providing a flexible way to manage schedules.
 **note** : drag works ony on calender page but can be added on event page if needed.


## Application Structure

### Context Provider (`ContextProvider`)
The application uses React Context API to manage the state globally. It provides functions and state variables for event management, including:

- **`events`**: Object storing events, categorized by date.
- **`selectedDate`**: Currently selected date for managing events.
- **`handleAddEvent`**: Adds a new event to the selected date.
- **`handleEditEvent`**: Opens a modal for editing an existing event.
- **`handleDeleteEvent`**: Removes an event and cleans up the date if no events remain.
- **`handleSearch`**: Filters events based on user queries.
- **`handleSortByCategory`**: Sorts events by their category.

### Pages

#### 1. **Calendar Page**
- Displays a monthly calendar.
- Users can click on a date to view or manage events for that specific date.

#### 2. **Event Page**
- Displays all events grouped by date.
- Allows users to edit or delete events.
- Includes a sorting dropdown for organizing events by category.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd event-manager
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open the application in your browser at `http://localhost:3000`.

---

## Technology Stack
- **React**: Next js with react for building the UI.
- **Context API**: For state management across components.
- **Tailwind CSS**: For responsive and modern styling.
- **LocalStorage**: For data persistence.

---

## How to Use

1. **Calendar View**: 
   - Navigate through months using the "Previous" and "Next" buttons.
   - Click on a specific date to manage events for that day.

2. **Event Management**:
   - Add new events using the input fields and dropdowns.
   - Edit or delete events directly from the Event Page.

3. **Search and Sort**:
   - Use the search bar to find events by name.
   - Use the category dropdown to sort events.

## Creator
- **Tarun**: Tarun kumar kushwaha.


