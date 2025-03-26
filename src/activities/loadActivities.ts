/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from "csv-parse/sync";

import { promises as fs } from "fs";

import { ActivityGroup } from "./types";

export const loadActivities = async (): Promise<ActivityGroup[]> => {
  const rolesExplanationsData = await fs.readFile(
    process.cwd() + "/src/data/developer-role-description-senior-developer.csv",
    "utf8"
  );

  const records = parse(rolesExplanationsData, {
    delimiter: ",",
    columns: true,
    skip_empty_lines: true,
  });

  let currentGroup: string = "";

  const activities = records.reduce(
    (
      obj: { [x: string]: { activities: any } },
      element: {
        group: any;
        activity: any;
        belowExpectations: any;
        sometimesAchievingExpectations: any;
        meetingExpectations: any;
        exceedingExpectations: any;
        settingNewStandard: any;
      }
    ) => {
      const {
        group,
        activity,
        belowExpectations,
        sometimesAchievingExpectations,
        meetingExpectations,
        exceedingExpectations,
        settingNewStandard,
      } = element;

      if (group) {
        currentGroup = group;
      }

      const finalActivity = activity.replace(/\./g, "").replace(/\:/g, "");

      if (meetingExpectations && activity) {
        return {
          ...obj,
          [currentGroup]: {
            ...obj[currentGroup],
            activities: {
              ...obj[currentGroup]?.activities,
              [finalActivity]: {
                belowExpectations,
                sometimesAchievingExpectations,
                meetingExpectations,
                exceedingExpectations,
                settingNewStandard,
              },
            },
          },
        };
      }

      return obj;
    },
    {}
  );

  return activities;
};
