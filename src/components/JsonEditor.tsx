import { useState, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Play, RotateCcw, Code2, CheckCircle2 } from 'lucide-react';

interface JsonEditorProps {
  onSubmit: (jsonString: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export function JsonEditor({ onSubmit, onClear, isLoading }: JsonEditorProps) {
  const [jsonInput, setJsonInput] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);

  const handleInputChange = useCallback((value: string) => {
    setJsonInput(value);
    
    if (!value.trim()) {
      setParseError(null);
      return;
    }

    try {
      JSON.parse(value);
      setParseError(null);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setParseError(err.message);
      }
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!jsonInput.trim()) {
      setParseError('Please enter a workflow JSON');
      return;
    }

    try {
      JSON.parse(jsonInput);
      onSubmit(jsonInput);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setParseError(err.message);
      }
    }
  }, [jsonInput, onSubmit]);

  const handleClear = useCallback(() => {
    setJsonInput('');
    setParseError(null);
    onClear();
  }, [onClear]);

  const isValidJson = jsonInput.trim() && !parseError;
  const hasContent = jsonInput.trim().length > 0;

  return (
    <Card className="border-border/60 bg-card/80 backdrop-blur-sm relative overflow-hidden corner-decoration">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Code2 className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg font-medium">Workflow JSON</span>
          </div>
          {hasContent && (
            <div className="flex items-center gap-2 text-xs font-mono">
              {isValidJson ? (
                <span className="flex items-center gap-1.5 text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Valid JSON
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-destructive">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Invalid
                </span>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* JSON Textarea */}
        <div className="relative group">
          <Textarea
            value={jsonInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={`// Paste your workflow JSON here...

{
  "nodes": [...],
  "connections": {...}
}`}
            className="min-h-[280px] font-mono text-sm bg-muted/30 border-border/60 resize-y 
                       placeholder:text-muted-foreground/40 focus:border-primary/50 focus:ring-primary/20
                       transition-all duration-200"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground/40 font-mono">
            {jsonInput.length > 0 && `${jsonInput.length.toLocaleString()} chars`}
          </div>
        </div>

        {/* Parse Error Display */}
        {parseError && (
          <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
            <div className="text-sm font-mono">
              <span className="text-destructive font-medium">SyntaxError: </span>
              <span className="text-destructive/80">{parseError}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            disabled={!isValidJson || isLoading}
            className="flex-1 h-11 font-medium gap-2 glow-subtle hover:glow-primary transition-all duration-300"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                <span className="font-mono">Analyzing...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Explain Workflow
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={isLoading || !hasContent}
            className="h-11 px-4 gap-2 hover:bg-muted/60 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
