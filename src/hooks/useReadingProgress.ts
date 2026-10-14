import { useState, useEffect, useCallback } from 'react';
import { 
  ReadingProgressState, 
  loadReadingProgress, 
  recordVersesExplored, 
  updateDailyGoal, 
  resetReadingProgress,
  RecordVersesParams,
  RecordVersesResult,
  getNextRankProgress,
  ReadingAchievement
} from '../utils/readingTracker';

export function useReadingProgress() {
  const [progress, setProgress] = useState<ReadingProgressState>(loadReadingProgress);
  const [recentCelebration, setRecentCelebration] = useState<{
    type: 'goal' | 'achievement' | 'rank';
    achievement?: ReadingAchievement;
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    // Initial sync
    setProgress(loadReadingProgress());

    // Listen for storage or internal broadcast changes
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ReadingProgressState>;
      if (customEvent.detail) {
        setProgress(customEvent.detail);
      } else {
        setProgress(loadReadingProgress());
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'qissa_reading_progress_v2') {
        setProgress(loadReadingProgress());
      }
    };

    window.addEventListener('qissa_reading_progress_updated', handleUpdate);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('qissa_reading_progress_updated', handleUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Record verses with optional celebration notification
  const logVerses = useCallback((params: RecordVersesParams = {}): RecordVersesResult => {
    const result = recordVersesExplored(params);
    setProgress(result.state);

    if (result.newlyUnlocked.length > 0) {
      const ach = result.newlyUnlocked[0];
      setRecentCelebration({
        type: 'achievement',
        achievement: ach,
        title: `تمغہ حاصل ہوا: ${ach.titleUrdu}`,
        description: ach.descriptionUrdu
      });
    } else if (result.achievedDailyGoal) {
      setRecentCelebration({
        type: 'goal',
        title: 'شاباش! روزانہ ہدف مکمل ہوا',
        description: `آپ نے آج کا ${result.state.dailyGoal} اشعار کا ہدف مکمل کر لیا ہے۔`
      });
    }

    return result;
  }, []);

  const setGoal = useCallback((goal: number) => {
    const updated = updateDailyGoal(goal);
    setProgress(updated);
  }, []);

  const resetProgress = useCallback(() => {
    const initial = resetReadingProgress();
    setProgress(initial);
  }, []);

  const clearCelebration = useCallback(() => {
    setRecentCelebration(null);
  }, []);

  const rankInfo = getNextRankProgress(progress.totalVersesExplored);

  return {
    progress,
    rankInfo,
    logVerses,
    setGoal,
    resetProgress,
    recentCelebration,
    clearCelebration
  };
}
