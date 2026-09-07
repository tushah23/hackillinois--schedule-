import { useState } from "react";
import { useEvents } from "./hooks/useEvents";
import { useFavorites } from "./hooks/useFavorites";
import { groupEventsByDay } from "./utils/groupEventsByDay";
import { getEventTypes } from "./utils/getEventTypes";
import { buildDivePath } from "./utils/buildDivePath";
import EventCard from "./components/EventCard";
import DivePath from "./components/DivePath";
import "./App.css";

const TYPE_EMOJIS = {
  WORKSHOP: "🌅",
  MEAL: "🐚",
  SPEAKER: "🦭",
  MINIEVENT: "🌊",
  OTHER: "🛥️",
};

function App() {
  const { events, loading, error } = useEvents();
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeType, setActiveType] = useState(null);
  const [view, setView] = useState("schedule"); // "schedule" | "divePath"
  const { toggleFavorite, isFavorite } = useFavorites();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const days = groupEventsByDay(events);
  const activeDay = days[activeDayIndex];
  const allTypes = getEventTypes(events);

  const visibleEvents = activeDay.events.filter(
    (event) => activeType === null || event.eventType === activeType
  );

  const favoritedEvents = events.filter((event) => isFavorite(event.eventId));
  const divePath = buildDivePath(favoritedEvents);

  function toggleType(type) {
    setActiveType(activeType === type ? null : type);
  }

  return (
    <div className="page">
      <div className="ocean-background">
        <div className="wave-layer wave-layer--1"></div>
        <div className="wave-layer wave-layer--2"></div>
        <div className="wave-layer wave-layer--3"></div>
        <div className="wave-layer wave-layer--4"></div>

        <div className="bubbles">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className={`bubble bubble--${i}`} />
          ))}
        </div>

        <div className="critters">
          <span className="fish fish--0">🐠</span>
          <span className="fish fish--1">🐟</span>
          <span className="fish fish--2">🐡</span>
          <span className="fish fish--3">🐠</span>
          <span className="fish fish--4">🐟</span>
          <span className="fish fish--5">🐡</span>
          <span className="octopus">🐙</span>
        </div>

        <div className="seafloor">
          <div className="seaweed seaweed--0"></div>
          <div className="seaweed seaweed--1"></div>
          <div className="seaweed seaweed--2"></div>
          <div className="seaweed seaweed--3"></div>
          <div className="coral coral--0"></div>
          <div className="coral coral--1"></div>
        </div>
      </div>

      <div className="content">
        <div className="view-switcher">
          <button
            className={`view-tab ${view === "schedule" ? "view-tab--active" : ""}`}
            onClick={() => setView("schedule")}
          >
            Full Schedule
          </button>
          <button
            className={`view-tab ${view === "divePath" ? "view-tab--active" : ""}`}
            onClick={() => setView("divePath")}
          >
            🤿 My Dive Path {favoritedEvents.length > 0 && `(${favoritedEvents.length})`}
          </button>
        </div>

        {view === "schedule" ? (
          <>
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

            <div className="filter-bar">
              {allTypes.map((type) => (
                <button
                  key={type}
                  className={`filter-chip filter-chip--${type.toLowerCase()} ${
                    activeType === type ? "filter-chip--active" : ""
                  }`}
                  onClick={() => toggleType(type)}
                >
                  {TYPE_EMOJIS[type] ?? "🔹"} {type}
                </button>
              ))}
            </div>

            <div className="event-list">
              {visibleEvents.map((event) => (
                <EventCard
                  key={event.eventId}
                  event={event}
                  isFavorited={isFavorite(event.eventId)}
                  onToggleFavorite={() => toggleFavorite(event.eventId)}
                />
              ))}
            </div>
          </>
        ) : (
          <DivePath divePath={divePath} />
        )}
      </div>
    </div>
  );
}

export default App;