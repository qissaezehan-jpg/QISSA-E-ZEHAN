import { useState, useEffect, useCallback, useMemo } from 'react';
import { DailyReflection, ReflectionMood } from '../types/poetry';
import { 
  loadReflections, 
  saveReflections, 
  addReflection, 
  updateReflection, 
  deleteReflection, 
  toggleBookmarkReflection,
  REFLECTIONS_EVENT_NAME 
} from '../utils/reflectionsStorage';
import { recordVersesExplored } from '../utils/readingTracker';

export interface ReflectionsStats {
  total: number;
  moodCounts: Record<string, number>;
  topMood: { mood: string; count: number } | null;
  topPoet: { poet: string; count: number } | null;
  bookmarksCount: number;
}

export function useDailyReflections() {
  const [reflections, setReflections] = useState<DailyReflection[]>(() => loadReflections());
  const [filterMood, setFilterMood] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterBookmarkedOnly, setFilterBookmarkedOnly] = useState<boolean>(false);

  // Sync with window custom events or storage events
  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<DailyReflection[]>;
      if (customEvent.detail) {
        setReflections(customEvent.detail);
      } else {
        setReflections(loadReflections());
      }
    };

    window.addEventListener(REFLECTIONS_EVENT_NAME, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(REFLECTIONS_EVENT_NAME, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const handleAddReflection = useCallback((entry: Omit<DailyReflection, 'id' | 'createdAt' | 'dateDisplay' | 'timeDisplay'>) => {
    const created = addReflection(entry);
    // Writing a reflection rewards the user on their literary streak!
    recordVersesExplored({
      count: 2,
      poetId: entry.poetName,
      type: 'tashreeh'
    });
    return created;
  }, []);

  const handleUpdateReflection = useCallback((id: string, updates: Partial<DailyReflection>) => {
    return updateReflection(id, updates);
  }, []);

  const handleDeleteReflection = useCallback((id: string) => {
    return deleteReflection(id);
  }, []);

  const handleToggleBookmark = useCallback((id: string) => {
    return toggleBookmarkReflection(id);
  }, []);

  // Filtered reflections
  const filteredReflections = useMemo(() => {
    return reflections.filter(item => {
      if (filterMood !== 'all' && item.mood !== filterMood) {
        return false;
      }
      if (filterBookmarkedOnly && !item.isBookmarked) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesContent = item.content.toLowerCase().includes(q);
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesPoet = item.poetName.toLowerCase().includes(q);
        const matchesMisra = item.misra1.toLowerCase().includes(q) || item.misra2.toLowerCase().includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesContent && !matchesTitle && !matchesPoet && !matchesMisra && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [reflections, filterMood, filterBookmarkedOnly, searchQuery]);

  // Statistics
  const stats = useMemo<ReflectionsStats>(() => {
    const total = reflections.length;
    const moodCounts: Record<string, number> = {};
    const poetCounts: Record<string, number> = {};

    reflections.forEach(r => {
      moodCounts[r.mood] = (moodCounts[r.mood] || 0) + 1;
      if (r.poetName) {
        poetCounts[r.poetName] = (poetCounts[r.poetName] || 0) + 1;
      }
    });

    let topMood: { mood: string; count: number } | null = null;
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (!topMood || count > topMood.count) {
        topMood = { mood, count };
      }
    });

    let topPoet: { poet: string; count: number } | null = null;
    Object.entries(poetCounts).forEach(([poet, count]) => {
      if (!topPoet || count > topPoet.count) {
        topPoet = { poet, count };
      }
    });

    return {
      total,
      moodCounts,
      topMood,
      topPoet,
      bookmarksCount: reflections.filter(r => r.isBookmarked).length
    };
  }, [reflections]);

  return {
    reflections,
    filteredReflections,
    filterMood,
    setFilterMood,
    searchQuery,
    setSearchQuery,
    filterBookmarkedOnly,
    setFilterBookmarkedOnly,
    stats,
    addReflection: handleAddReflection,
    updateReflection: handleUpdateReflection,
    deleteReflection: handleDeleteReflection,
    toggleBookmark: handleToggleBookmark
  };
}
