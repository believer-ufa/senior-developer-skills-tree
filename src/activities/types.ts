export type ActivityLevelType =
  | "belowExpectations"
  | "sometimesAchievingExpectations"
  | "meetingExpectations"
  | "exceedingExpectations"
  | "settingNewStandard";

export type ActivityLevels = Record<ActivityLevelType, string>;

export type ActivityGroup = Record<string, ActivityLevels>;
