function EventCard({ event }) {
  const { name, description, startTime, endTime, eventType, locations, sponsor } = event;

  const start = new Date(startTime * 1000);
  const end = new Date(endTime * 1000);

  const timeRange = `${start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} – ${end.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;

  const location = locations?.[0]?.description ?? "Location TBA";

  return (
    <div className={`event-card event-card--${eventType.toLowerCase()}`}>
      <div className="event-card__header">
        <span className="event-card__type">{eventType}</span>
        {sponsor && <span className="event-card__sponsor">{sponsor}</span>}
      </div>
      <h3 className="event-card__name">{name}</h3>
      <p className="event-card__time">{timeRange}</p>
      <p className="event-card__location">{location}</p>
      {description && <p className="event-card__description">{description}</p>}
    </div>
  );
}

export default EventCard;