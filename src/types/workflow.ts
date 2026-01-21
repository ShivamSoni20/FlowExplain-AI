// Types for the workflow explanation API response
export interface WorkflowStep {
  step_name: string;
  description: string;
}

export interface WorkflowExplanation {
  workflow_summary: string;
  step_by_step_explanation: WorkflowStep[];
  trigger_type: string;
  primary_use_case: string;
  complexity_level: 'Low' | 'Medium' | 'High' | string;
  maintenance_notes: string;
}

// Request payload type
export interface WorkflowRequest {
  workflowJson: string;
}
