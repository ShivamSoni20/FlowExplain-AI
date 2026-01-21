import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight, GitBranch, Expand, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WorkflowStep } from '@/types/workflow';

interface StepsListProps {
  steps: WorkflowStep[];
}

export function StepsList({ steps }: StepsListProps) {
  const [openSteps, setOpenSteps] = useState<Set<number>>(new Set([0]));

  const toggleStep = (index: number) => {
    const newOpenSteps = new Set(openSteps);
    if (newOpenSteps.has(index)) {
      newOpenSteps.delete(index);
    } else {
      newOpenSteps.add(index);
    }
    setOpenSteps(newOpenSteps);
  };

  const expandAll = () => {
    setOpenSteps(new Set(steps.map((_, i) => i)));
  };

  const collapseAll = () => {
    setOpenSteps(new Set());
  };

  return (
    <Card className="border-border/60 bg-card/80 backdrop-blur-sm relative overflow-hidden corner-decoration">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <GitBranch className="h-4 w-4 text-primary" />
            </div>
            <span>Execution Flow</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {steps.length} steps
            </span>
          </CardTitle>
          <div className="flex gap-1">
            <button
              onClick={expandAll}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-colors"
              title="Expand all"
            >
              <Expand className="h-4 w-4" />
            </button>
            <button
              onClick={collapseAll}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-colors"
              title="Collapse all"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {steps.map((step, index) => (
          <Collapsible
            key={index}
            open={openSteps.has(index)}
            onOpenChange={() => toggleStep(index)}
          >
            <CollapsibleTrigger className="w-full group">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-border/60 transition-all duration-200 text-left">
                {/* Step number indicator */}
                <div className="relative">
                  <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-semibold shrink-0 group-hover:glow-subtle transition-all">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-2 bg-border/60" />
                  )}
                </div>
                
                {/* Step name */}
                <span className="flex-1 text-sm font-medium text-foreground truncate">
                  {step.step_name || `Step ${index + 1}`}
                </span>
                
                {/* Expand indicator */}
                <ChevronRight 
                  className={cn(
                    'h-4 w-4 text-muted-foreground transition-transform duration-200',
                    openSteps.has(index) && 'rotate-90'
                  )} 
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="ml-10 pl-4 pr-3 py-3 border-l-2 border-primary/20 text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}
