import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type SummarizeErrorProps = {
  error: Error;
};

export function SummarizeError({ error }: SummarizeErrorProps) {
  return (
    <div className="flex justify-center w-full py-6">
      <Alert variant="destructive" className="w-full max-w-4xl">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </AlertDescription>
      </Alert>
    </div>
  );
}
