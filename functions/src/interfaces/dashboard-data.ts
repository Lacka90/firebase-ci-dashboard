export enum Statuses {
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  UNKNOWN = 'unknown',
}

export interface DashboardData {
  project: string;
  repoUrl: string;
  buildNumber: number | string;
  buildStatus: Statuses;
  buildUrl: string;
  commit: string;
  startedBy: string;
  starterAvatar: string;
  startedAt: string | Date;
  duration: number;
  rawData: any;
}
