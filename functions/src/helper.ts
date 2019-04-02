export enum CIType {
  CIRCLE_CI = "circle_ci",
  GITLAB_CI = "gitlab_ci"
}

export function getCiType(body: any) {
  if (body && body.payload && body.payload.circle_yml) {
    return CIType.CIRCLE_CI;
  } else if (
    body &&
    body.object_kind === "pipeline" &&
    body.object_attributes &&
    typeof body.object_attributes.id === "number"
  ) {
    return CIType.GITLAB_CI;
  } else {
    console.log("CI type not recognized.");
    return;
  }
}
