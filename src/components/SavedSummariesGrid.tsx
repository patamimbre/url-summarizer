"use client";

import { useSavedSummaries } from "@/hooks/useSavedSummaries";
import { SummarizeContent } from "./SummarizeContent";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Info } from "lucide-react";

export function SavedSummariesGrid() {
  const { savedSummaries, toggleSave, isLoading } = useSavedSummaries();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10">
        <FileText className="h-12 w-12 mb-4 text-gray-400" />
        <p className="text-xl font-semibold text-gray-600">Loading saved summaries...</p>
        <p className="text-sm text-gray-500">Please wait a moment.</p>
      </div>
    );
  }

  if (savedSummaries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
        <Info className="h-16 w-16 text-blue-500" />
        <h2 className="text-2xl font-semibold">No Saved Summaries Yet</h2>
        <p className="text-muted-foreground max-w-md">
          It looks like you haven&apos;t saved any summaries.
          Go ahead and summarize a URL to see it here!
        </p>
        <Button asChild>
          <Link href="/">Summarize a URL</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
      {savedSummaries.map((generation) => (
        <SummarizeContent
          key={generation.url} // Assuming URL is unique and stable
          generation={generation}
          isSaved={true} // It's in savedSummaries, so it is saved
          onToggleSave={() => toggleSave(generation)} // Allows un-saving
        />
      ))}
    </div>
  );
}