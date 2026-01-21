import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
}

export function InfoCard({ title, value, icon: Icon }: InfoCardProps) {
  return (
    <Card className="border-border/60 bg-card/80 backdrop-blur-sm h-full hover:border-primary/30 transition-colors duration-300">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-mono text-muted-foreground/70 uppercase tracking-wider mb-1.5">
              {title}
            </p>
            <p className="text-sm text-foreground font-medium leading-relaxed">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
