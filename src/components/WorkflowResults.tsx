import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InfoCard } from './InfoCard';
import { StepsList } from './StepsList';
import { ComplexityBadge } from './ComplexityBadge';
import { WorkflowExplanation } from '@/types/workflow';
import { Zap, Target, AlertTriangle, FileText, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface WorkflowResultsProps {
  explanation: WorkflowExplanation;
}

export function WorkflowResults({ explanation }: WorkflowResultsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyNotes = async () => {
    try {
      await navigator.clipboard.writeText(explanation.maintenance_notes);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <Card className="border-border/60 bg-card/80 backdrop-blur-sm relative overflow-hidden corner-decoration opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <span>Workflow Summary</span>
            </CardTitle>
            <ComplexityBadge level={explanation.complexity_level} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {explanation.workflow_summary}
          </p>
        </CardContent>
      </Card>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '150ms' }}>
          <InfoCard
            title="Trigger Type"
            value={explanation.trigger_type}
            icon={Zap}
          />
        </div>
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <InfoCard
            title="Primary Use Case"
            value={explanation.primary_use_case}
            icon={Target}
          />
        </div>
      </div>

      {/* Step-by-Step Explanation */}
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: '250ms' }}>
        <StepsList steps={explanation.step_by_step_explanation} />
      </div>

      {/* Maintenance Notes */}
      <Card className="border-warning/30 bg-warning/5 relative overflow-hidden opacity-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
        <div className="absolute top-0 left-0 w-1 h-full bg-warning" />
        <CardHeader className="pb-3 pl-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-lg text-warning">
              <AlertTriangle className="h-5 w-5" />
              Maintenance Notes
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyNotes}
              className="h-8 px-2 gap-1.5 text-warning/70 hover:text-warning hover:bg-warning/10"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span className="text-xs font-mono">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="text-xs font-mono">Copy</span>
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pl-6">
          <p className="text-muted-foreground leading-relaxed">
            {explanation.maintenance_notes}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
