export type IssueType = 'Set-top Box Issues' | 'Channel Problems' | 'Signal Issues' | 'Billing Queries' | 'Picture Quality' | 'Audio Problems';

export interface Ticket {
  id: string;
  issueType: IssueType;
  message: string;
  status: 'open' | 'closed';
  createdAt: string;
}

export const ISSUE_TYPES: IssueType[] = [
  'Set-top Box Issues',
  'Channel Problems',
  'Signal Issues',
  'Billing Queries',
  'Picture Quality',
  'Audio Problems'
];