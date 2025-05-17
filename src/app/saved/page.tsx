import { SavedSummariesGrid } from "@/components/SavedSummariesGrid";
import { BookMarked } from "lucide-react";

export default function SavedPage() {
  return (
    <div className="container mx-auto w-full flex flex-col items-center gap-8 px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center space-y-2 w-full max-w-4xl">
        <div className="flex items-center space-x-2 mb-4">
          <BookMarked className="h-10 w-10" />
          <h1 className="text-4xl font-bold tracking-tight">Saved Summaries</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-xl">
          Here are all the summaries you have saved for quick access.
        </p>
      </div>
      <SavedSummariesGrid />
    </div>
  );
}