import { TreeNode } from "primereact/treenode";

export interface TreeNodeWithActivityData extends TreeNode {
  desc?: string;
  level?: string;
}
