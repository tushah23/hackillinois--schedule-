export function getEventTypes(events) {
  const types = new Set(events.map((event) => event.eventType));
  return Array.from(types).sort();
}