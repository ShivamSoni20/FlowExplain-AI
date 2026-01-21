import { Link } from 'react-router-dom';
import { JsonEditor } from '@/components/JsonEditor';
import { WorkflowResults } from '@/components/WorkflowResults';
import { LoadingState } from '@/components/LoadingState';
import { useWorkflowExplainer } from '@/hooks/useWorkflowExplainer';
import { AlertCircle, Cpu, Sparkles, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const Index = () => {
  const { explanation, isLoading, error, submitWorkflow, clearResults } = useWorkflowExplainer();

  return (
    <div className="min-h-screen bg-background relative">
      {/* Radial gradient overlay */}
      <div className="fixed inset-0 bg-gradient-radial pointer-events-none" />

      {/* Header */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="relative p-2.5 rounded-xl bg-primary/10 border border-primary/20 glow-subtle">
                <Cpu className="h-5 w-5 text-primary" />
                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-2">
                  Workflow Explainer
                  <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    v2.0
                  </span>
                </h1>
                <p className="text-sm text-muted-foreground font-light">
                  AI-powered automation workflow analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 relative z-[1]">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* JSON Editor Section */}
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <JsonEditor
              onSubmit={submitWorkflow}
              onClear={clearResults}
              isLoading={isLoading}
            />
          </div>

          {/* Error Display */}
          {error && (
            <Card className="border-destructive/40 bg-destructive/5 opacity-0 animate-fade-up" style={{ animationDelay: '150ms' }}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-destructive/10">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-destructive">Analysis Failed</p>
                  <p className="text-sm text-destructive/70 mt-1 font-mono">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loading State */}
          {isLoading && <LoadingState />}

          {/* Results Display */}
          {explanation && !isLoading && (
            <WorkflowResults explanation={explanation} />
          )}

          {/* Empty State */}
          {!explanation && !isLoading && !error && (
            <div className="space-y-12">
              <div className="text-center py-10 opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
                <div className="inline-flex items-center justify-center p-5 rounded-2xl bg-muted/50 border border-border/60 mb-6 animate-float">
                  <Sparkles className="h-10 w-10 text-muted-foreground/60" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  Ready to analyze
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Paste your workflow JSON above and click{' '}
                  <span className="font-mono text-primary text-sm">Explain Workflow</span>{' '}
                  to get an AI-powered breakdown.
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground/70 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    n8n
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Make
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                    Zapier
                  </span>
                </div>
              </div>

              {/* Tips Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
                <div className="p-4 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Pro Tip
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Make sure to export your workflow as JSON before pasting it here for the best results.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Privacy
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Your workflow data is only used for analysis and is never stored on our servers.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-auto relative z-[1]">
        <div className="container mx-auto px-4 py-5">
          <p className="text-center text-sm text-muted-foreground/70 font-mono tracking-wide">
            <span className="text-primary">▸</span> workflow.explain() <span className="text-muted-foreground/40">// powered by AI</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
