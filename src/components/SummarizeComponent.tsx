"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { type SummarizationGeneration, summarize } from "@/app/actions/summarize";
import { SummarizeContent } from "./SummarizeContent";
import { Loading } from "./SummarizeLoading";
import { SummarizeError } from "./SummarizeError";
import { z } from "zod";
import type { Lang } from "@/lib/lang";
import { LangSelector } from "./LangSelector";
import { useSavedSummaries } from "@/hooks/useSavedSummaries";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// URL validation schema
const urlSchema = z.string().url();

export function SummarizeComponent() {
  const [generation, setGeneration] = useState<SummarizationGeneration | undefined>();
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  const [isValidUrl, setIsValidUrl] = useState<boolean>(false);
  const [lang, setLang] = useState<Lang>("en");

  const { isSaved, toggleSave, isLoading: isLoadingSaved } = useSavedSummaries();

  // Validate URL whenever it changes
  useEffect(() => {
    const validationResult = urlSchema.safeParse(url);
    setIsValidUrl(validationResult.success);
  }, [url]);

  const handleSummarize = async () => {
    setGeneration(undefined);
    setError(undefined);
    setIsLoading(true);
    try {
      const newGeneration = await summarize(url, lang);
      setGeneration(newGeneration);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full h-full">
      <div className="flex flex-row items-center gap-2 w-full max-w-4xl">
        <Input
          type="text"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow"
        />
        <LangSelector lang={lang} setLang={setLang} />
        <Button
          onClick={handleSummarize}
          disabled={isLoading || !isValidUrl || isLoadingSaved}
        >
          Summarize
        </Button>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {error && <SummarizeError error={error} />}
        {isLoading && <Loading />}
        {generation && (
          <SummarizeContent
            generation={generation}
            isSaved={isSaved(generation.url)}
            onToggleSave={() => toggleSave(generation)}
          />
        )}
      </div>
    </div>
  );
}