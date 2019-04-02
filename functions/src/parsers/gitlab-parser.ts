import { DashboardData, Statuses } from "../interfaces/dashboard-data";
import { GitlabPayload } from "../interfaces/gitlab-payload";

function getStatus(status: string) {
  if (status === "success") {
    return Statuses.SUCCESS;
  } else if (status === "failed") {
    return Statuses.FAILED;
  } else if (status === "cancelled") {
    return Statuses.CANCELLED;
  } else {
    return Statuses.UNKNOWN;
  }
}

export function parseGitlab(body: GitlabPayload): DashboardData {
  return {
    repoUrl: body.project.web_url,
    commit: body.commit.message,
    project: body.project.name,
    buildNumber: body.object_attributes.id,
    buildStatus: getStatus(body.object_attributes.status),
    buildUrl: "",
    duration: body.object_attributes.duration,
    startedAt: body.object_attributes.createdAt,
    startedBy: body.user.name,
    starterAvatar: body.user.avatar_url,
    rawData: body
  };
}
