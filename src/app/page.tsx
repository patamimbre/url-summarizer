import { SummarizeComponent } from "@/components/SummarizeComponent";
import { FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="container w-full flex flex-col items-center justify-center gap-8 px-4">
      <div className="flex flex-col items-center justify-center text-center space-y-2 w-full max-w-4xl">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="h-10 w-10" />
          <h1 className="text-4xl font-bold tracking-tight">URL Summarizer</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-xl">
          Paste any URL and get an AI-powered summary of the content. Save time and quickly grasp the key points.
        </p>
      </div>

      <div className="flex justify-center w-full">
        <SummarizeComponent />
      </div>
    </div>
  );
}
