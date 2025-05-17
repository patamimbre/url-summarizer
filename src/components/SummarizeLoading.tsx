import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="flex justify-center w-full py-6">
      <Card className="w-full max-w-4xl shadow-md">
        <CardHeader className="pb-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-5 w-16 rounded-full" />
            ))}
          </div>
          <div className="space-y-3 mt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}