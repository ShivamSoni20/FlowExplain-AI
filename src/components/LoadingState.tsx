import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Cpu } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="space-y-6 opacity-0 animate-fade-up" style={{ animationDelay: '50ms' }}>
      {/* Analysis indicator */}
      <div className="flex items-center justify-center gap-3 py-6">
        <div className="relative">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 pulse-glow">
            <Cpu className="h-6 w-6 text-primary" />
          </div>
          <div className="absolute inset-0 rounded-xl border-2 border-primary/20 animate-ping" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Analyzing workflow...</p>
          <p className="text-xs text-muted-foreground font-mono mt-1">Processing nodes and connections</p>
        </div>
      </div>

      {/* Summary skeleton */}
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm overflow-hidden relative">
        <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer" />
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-5 w-36" />
            </div>
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </CardContent>
      </Card>

      {/* Info cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <Card key={i} className="border-border/60 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Steps skeleton */}
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-5 w-32" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Skeleton className="h-7 w-7 rounded-lg shrink-0" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-4" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
