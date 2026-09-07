export function groupEventsByDay(events) {
  const groups = {};

  for (const event of events) {
    const date = new Date(event.startTime * 1000);
    const dateKey = date.toDateString(); // e.g. "Sat Feb 27 2027" — stable grouping key

    if (!groups[dateKey]) {
      groups[dateKey] = {
        date,
        events: [],
      };
    }
    groups[dateKey].events.push(event);
  }

  // Sort each day's events chronologically
  for (const key in groups) {
    groups[key].events.sort((a, b) => a.startTime - b.startTime);
  }

  // Convert to a sorted array of days (chronological), and add "Day 1/2/3" labels
  const sortedDays = Object.values(groups).sort((a, b) => a.date - b.date);

  return sortedDays.map((day, index) => ({
    dayNumber: index + 1,
    dateLabel: day.date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    events: day.events,
  }));
}
