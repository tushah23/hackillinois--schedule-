import { useState, useEffect } from "react";

const STORAGE_KEY = "hackillinois-favorites";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favoriteIds)));
  }, [favoriteIds]);

  function toggleFavorite(eventId) {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  }

  function isFavorite(eventId) {
    return favoriteIds.has(eventId);
  }

  return { favoriteIds, toggleFavorite, isFavorite };
}