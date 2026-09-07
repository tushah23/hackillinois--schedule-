import { useState } from "react";
import { useEvents } from "./hooks/useEvents";
import { groupEventsByDay } from "./utils/groupEventsByDay";
import EventCard from "./components/EventCard";
import "./App.css";

function App() {
  const { events, loading, error } = useEvents();
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const days = groupEventsByDay(events);
  const activeDay = days[activeDayIndex];

  return (
    <div>
      <div className="day-tabs">
        {days.map((day, index) => (
          <button
            key={day.dayNumber}
            className={`day-tab ${index === activeDayIndex ? "day-tab--active" : ""}`}
            onClick={() => setActiveDayIndex(index)}
          >
            <span className="day-tab__number">Day {day.dayNumber}</span>
            <span className="day-tab__date">{day.dateLabel}</span>
          </button>
        ))}
      </div>

      <div className="event-list">
        {activeDay.events.map((event) => (
          <EventCard key={event.eventId} event={event} />
        ))}
      </div>
    </div>
  );
}

export default App;
