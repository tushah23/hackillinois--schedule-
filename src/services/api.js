const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchEvents() {
  const response = await fetch(`${BASE_URL}/event/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status}`);
  }

  const data = await response.json();
  return data.events; // API wraps the array in an `events` key
}