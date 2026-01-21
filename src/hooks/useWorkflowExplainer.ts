import { useState, useCallback } from 'react';
import { WEBHOOK_URL } from '@/config/api';
import { WorkflowExplanation, WorkflowRequest } from '@/types/workflow';

interface UseWorkflowExplainerReturn {
  explanation: WorkflowExplanation | null;
  isLoading: boolean;
  error: string | null;
  submitWorkflow: (jsonString: string) => Promise<void>;
  clearResults: () => void;
}

export function useWorkflowExplainer(): UseWorkflowExplainerReturn {
  const [explanation, setExplanation] = useState<WorkflowExplanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitWorkflow = useCallback(async (jsonString: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload: WorkflowRequest = {
        workflowJson: jsonString,
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      // Handle array response from n8n - extract first element
      const explanation = Array.isArray(data) ? data[0] : data;
      setExplanation(explanation as WorkflowExplanation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setExplanation(null);
    setError(null);
  }, []);

  return {
    explanation,
    isLoading,
    error,
    submitWorkflow,
    clearResults,
  };
}
