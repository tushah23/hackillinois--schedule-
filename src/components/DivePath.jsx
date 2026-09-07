function formatTime(unixSeconds) {
  return new Date(unixSeconds * 1000).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function DivePath({ divePath }) {
  if (divePath.length === 0) {
    return (
      <p className="dive-path__empty">
        No favorited events yet — star events in the Full Schedule to build your dive path!
      </p>
    );
  }

  return (
    <div className="dive-path">
      {divePath.map(({ event, hasConflict, gapAfterMinutes, isLongGap }) => (
        <div key={event.eventId} className="dive-path__item">
          <div className={`dive-path__node ${hasConflict ? "dive-path__node--conflict" : ""}`}>
            <div className="dive-path__time">{formatTime(event.startTime)}</div>
            <div className="dive-path__name">{event.name}</div>
            {hasConflict && (
              <div className="dive-path__warning">
                ⚠️ Overlaps with another favorited event
              </div>
            )}
          </div>

          {isLongGap && (
            <div className="dive-path__gap">
              🫧 {Math.round(gapAfterMinutes / 60)}h {Math.round(gapAfterMinutes % 60)}m free
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DivePath;