export type TeamOrderStatus =
  | "NEW"
  | "INTAKE_COMPLETE"
  | "PROMPTS_READY"
  | "IN_PRODUCTION"
  | "REVIEW_NEEDED"
  | "DELIVERED"
  | "ARCHIVED";

export type PlayerStatus =
  | "NEEDS_INTAKE"
  | "READY_FOR_PROMPT"
  | "PROMPT_READY"
  | "IN_SUNO"
  | "VERSIONS_CREATED"
  | "FINAL_SELECTED"
  | "COMPLETE";

export type SongApprovalStatus =
  | "NEEDS_REVIEW"
  | "GOOD_OPTION"
  | "NEEDS_REVISION"
  | "APPROVED"
  | "REJECTED";

export type DeliveryStatus = "NOT_STARTED" | "PREPARING" | "SENT" | "COMPLETE";

export const teamOrderStatusLabels: Record<TeamOrderStatus, string> = {
  NEW: "New",
  INTAKE_COMPLETE: "Intake Complete",
  PROMPTS_READY: "Prompts Ready",
  IN_PRODUCTION: "In Production",
  REVIEW_NEEDED: "Review Needed",
  DELIVERED: "Delivered",
  ARCHIVED: "Archived",
};

export const playerStatusLabels: Record<PlayerStatus, string> = {
  NEEDS_INTAKE: "Needs Intake",
  READY_FOR_PROMPT: "Ready for Prompt",
  PROMPT_READY: "Prompt Ready",
  IN_SUNO: "In Suno",
  VERSIONS_CREATED: "Versions Created",
  FINAL_SELECTED: "Final Selected",
  COMPLETE: "Complete",
};

export const songApprovalStatusLabels: Record<SongApprovalStatus, string> = {
  NEEDS_REVIEW: "Needs Review",
  GOOD_OPTION: "Good Option",
  NEEDS_REVISION: "Needs Revision",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const deliveryStatusLabels: Record<DeliveryStatus, string> = {
  NOT_STARTED: "Not Started",
  PREPARING: "Preparing",
  SENT: "Sent",
  COMPLETE: "Complete",
};

export function statusOptions<T extends string>(labels: Record<T, string>) {
  return Object.entries(labels).map(([value, label]) => ({ value, label }));
}

function labelFor<T extends string>(labels: Record<T, string>, value: string | null | undefined, fallback: T) {
  return labels[(value as T) ?? fallback] ?? labels[fallback];
}

export function teamOrderStatusLabel(value: string | null | undefined) {
  return labelFor(teamOrderStatusLabels, value, "NEW");
}

export function playerStatusLabel(value: string | null | undefined) {
  return labelFor(playerStatusLabels, value, "NEEDS_INTAKE");
}

export function songApprovalStatusLabel(value: string | null | undefined) {
  return labelFor(songApprovalStatusLabels, value, "NEEDS_REVIEW");
}

export function deliveryStatusLabel(value: string | null | undefined) {
  return labelFor(deliveryStatusLabels, value, "NOT_STARTED");
}
