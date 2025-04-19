import { Ticket } from './types';

export const DUMMY_TICKETS: Ticket[] = [
  {
    id: '1',
    issueType: 'Set-top Box Issues',
    message: 'Set-top box not turning on after power outage',
    status: 'open',
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    issueType: 'Channel Problems',
    message: 'Sports channels package not working',
    status: 'open',
    createdAt: '2024-03-14T15:30:00Z'
  },
  {
    id: '3',
    issueType: 'Signal Issues',
    message: 'Poor reception during rainy weather',
    status: 'closed',
    createdAt: '2024-03-13T09:15:00Z'
  }
];