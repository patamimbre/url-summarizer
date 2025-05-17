"use client";

import { useState, useEffect, useCallback } from 'react';
import type { SummarizationGeneration } from '@/app/actions/summarize';

const LOCAL_STORAGE_KEY = 'savedSummaries';

export function useSavedSummaries() {
  const [savedSummaries, setSavedSummaries] = useState<SummarizationGeneration[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const items = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (items) {
          setSavedSummaries(JSON.parse(items));
        }
      } catch (error) {
        console.error("Error reading saved summaries from localStorage:", error);
        // Fallback to empty array if parsing fails or localStorage is inaccessible
        setSavedSummaries([]);
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedSummaries));
      } catch (error) {
        console.error("Error saving summaries to localStorage:", error);
      }
    }
  }, [savedSummaries, isLoaded]);

  const isSaved = useCallback((url: string): boolean => {
    if (!isLoaded) return false; // Don't claim saved if not loaded yet
    return savedSummaries.some(summary => summary.url === url);
  }, [savedSummaries, isLoaded]);

  const toggleSave = useCallback((summaryToToggle: SummarizationGeneration) => {
    if (!isLoaded || !summaryToToggle.url) return;

    setSavedSummaries(prevSummaries => {
      const existingIndex = prevSummaries.findIndex(s => s.url === summaryToToggle.url);
      if (existingIndex > -1) {
        // Remove if exists
        return prevSummaries.filter((_, index) => index !== existingIndex);
      }
      // Add if not exists
      return [...prevSummaries, summaryToToggle];
    });
  }, [isLoaded]);

  const getSavedSummaries = useCallback((): SummarizationGeneration[] => {
    return savedSummaries;
  }, [savedSummaries]);

  return {
    savedSummaries: getSavedSummaries(),
    isSaved,
    toggleSave,
    isLoading: !isLoaded, // Expose loading state
  };
}