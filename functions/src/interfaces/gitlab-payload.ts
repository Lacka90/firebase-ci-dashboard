export interface GitlabPayload {
  project: {
    name: string;
    web_url: string;
  };
  commit: {
    message: string;
  };
  object_attributes: {
    id: number;
    ref: string;
    status: string;
    duration: number;
    createdAt: string;
  };
  user: {
    name: string;
    avatar_url: string;
  };
}
