const GAP_THRESHOLD_MINUTES = 90;

export function buildDivePath(favoritedEvents) {
  const sorted = [...favoritedEvents].sort((a, b) => a.startTime - b.startTime);

  return sorted.map((event, index) => {
    const conflictsWith = sorted.filter(
      (other) =>
        other.eventId !== event.eventId &&
        event.startTime < other.endTime &&
        other.startTime < event.endTime
    );

    const next = sorted[index + 1];
    let gapAfterMinutes = null;
    if (next && next.startTime >= event.endTime) {
      gapAfterMinutes = (next.startTime - event.endTime) / 60;
    }

    return {
      event,
      hasConflict: conflictsWith.length > 0,
      conflictsWith,
      gapAfterMinutes,
      isLongGap: gapAfterMinutes !== null && gapAfterMinutes > GAP_THRESHOLD_MINUTES,
    };
  });
}