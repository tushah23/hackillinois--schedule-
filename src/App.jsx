import { useEvents } from "./hooks/useEvents";

function App() {
  const { events, loading, error } = useEvents();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(events);

  return <p>Loaded {events.length} events — check the console</p>;
}

export default App;