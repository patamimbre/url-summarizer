import type { SummarizationGeneration } from "@/app/actions/summarize";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";

type SummarizeContentProps = {
  generation: SummarizationGeneration;
  isSaved: boolean;
  onToggleSave: () => void;
};

export function SummarizeContent({ generation: { summary, url }, isSaved, onToggleSave }: SummarizeContentProps) {
  return (
    <div className="flex justify-center w-full py-6">
      <Card className="w-full max-w-4xl shadow-md">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <CardTitle className="text-2xl font-bold">{summary.title}</CardTitle>
              {url && (
                <CardDescription className="flex items-center gap-1 text-sm mt-2">
                  <ExternalLink className="h-3.5 w-3.5" />
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline truncate"
                  >
                    {url.split('?')[0]}
                  </a>
                </CardDescription>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onToggleSave} className="ml-4 flex-shrink-0">
              <Star className={`h-5 w-5 ${isSaved ? 'fill-yellow-400 text-yellow-500' : 'text-gray-400'}`} />
              <span className="sr-only">{isSaved ? 'Unsave' : 'Save'} summary</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {summary.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {summary.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed whitespace-pre-line">
            <ReactMarkdown>{summary.content}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
