import { useEvents } from "./hooks/useEvents";
import EventCard from "./components/EventCard";

function App() {
  const { events, loading, error } = useEvents();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </div>
  );
}

export default App;