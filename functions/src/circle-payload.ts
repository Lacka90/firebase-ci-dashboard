export interface CirclePayload {
  build_parameters: {
    CIRCLE_JOB: string;
  };
  reponame: string;
  committer_date: string;
  status: 'success' | 'failed';
  build_num: number;
  build_time_millis: number;
  build_url: string;
  vcs_url: string;
  user: {
    avatar_url: string;
    name: string;
  };
}
