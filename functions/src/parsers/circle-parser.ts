import { CirclePayload } from "../interfaces/circle-payload";
import { DashboardData, Statuses } from "../interfaces/dashboard-data";

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

export function parseCircle(body: CirclePayload): DashboardData {
  const { payload } = body;
  return {
    repoUrl: payload.vcs_url,
    commit: payload.subject,
    project: payload.reponame,
    buildNumber: payload.build_num,
    buildStatus: getStatus(payload.status),
    buildUrl: payload.build_url,
    duration: payload.build_time_millis,
    startedAt: payload.start_time,
    startedBy: payload.user.name,
    starterAvatar: payload.user.avatar_url,
    rawData: body
  };
}
