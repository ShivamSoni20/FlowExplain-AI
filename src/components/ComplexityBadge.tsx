import { cn } from '@/lib/utils';
import { Gauge } from 'lucide-react';

interface ComplexityBadgeProps {
  level: string;
}

export function ComplexityBadge({ level }: ComplexityBadgeProps) {
  const normalizedLevel = level?.toLowerCase() || 'unknown';
  
  const config = {
    low: {
      label: 'Low',
      className: 'bg-success/10 text-success border-success/30',
      dotClassName: 'bg-success',
    },
    medium: {
      label: 'Medium',
      className: 'bg-warning/10 text-warning border-warning/30',
      dotClassName: 'bg-warning',
    },
    high: {
      label: 'High',
      className: 'bg-destructive/10 text-destructive border-destructive/30',
      dotClassName: 'bg-destructive',
    },
    unknown: {
      label: level || 'Unknown',
      className: 'bg-muted text-muted-foreground border-border',
      dotClassName: 'bg-muted-foreground',
    },
  };

  const { label, className, dotClassName } = config[normalizedLevel as keyof typeof config] || config.unknown;

  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium font-mono',
      className
    )}>
      <Gauge className="h-3 w-3" />
      <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse', dotClassName)} />
      {label}
    </div>
  );
}
