"use client";

import { Tree, TreeNodeTemplateOptions } from "primereact/tree";
import { useMemo, useState } from "react";
import { ActivityLevelTitles } from "../../activities/titles";
import { ActivityGroup } from "../../activities/types";
import { TreeNodeWithActivityData } from "@/app/types";

import styles from "./ActivitiesChart.module.scss";

export const ActivitiesChart = ({
  activitiesGroups,
}: {
  activitiesGroups: ActivityGroup[];
}) => {
  const nodeTemplate = (
    node: TreeNodeWithActivityData,
    options: TreeNodeTemplateOptions
  ) => {
    const label = <span>{node.label}</span>;

    if (node.desc) {
      return (
        <span className={options.className}>
          <span className={styles.levelTitle}>{node.level}.</span>
          <span className={styles.levelDescription}>&nbsp;{node.desc}</span>
        </span>
      );
    }

    return <span className={options.className}>{label}</span>;
  };

  const activitiesGroupsArr = useMemo(() => {
    return Object.entries(activitiesGroups).map(
      ([groupTitle, { activities }]) => {
        return {
          label: groupTitle,
          className: styles.activityGroup,
          key: groupTitle,
          children: Object.entries(activities).map(
            ([activityTitle, levels]) => ({
              label: activityTitle,
              className: styles.activity,
              key: `${groupTitle}.${activityTitle}`,
              children: Object.entries(levels)
                .map(([levelTitle, levelDescription], idx) => ({
                  label: ActivityLevelTitles?.[levelTitle] ?? "",
                  level: idx + 1,
                  desc: levelDescription,
                  key: `${groupTitle}.${activityTitle}.${levelTitle}`,
                  className: styles.levelTitleBlock,
                }))
                .filter(({ desc }) => !!desc),
            })
          ),
        };
      }
    );
  }, [activitiesGroups]);

  const [expandedKeys, setExpandedKeys] = useState(
    activitiesGroupsArr.reduce(
      (obj, group) => ({
        ...obj,
        ...Object.fromEntries(
          group.children.map((activity) => [
            `${group.label}.${activity.label}`,
            true,
          ])
        ),
      }),
      {}
    )
  );

  return (
    <Tree
      expandedKeys={expandedKeys}
      nodeTemplate={nodeTemplate}
      onToggle={(e) => setExpandedKeys(e.value)}
      value={activitiesGroupsArr}
    />
  );
};
