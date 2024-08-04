export type NodeType = 'folder' | 'assembly';
export type ExtendedTreeItemProps = {
  nodeType?: NodeType;
  id: string;
  label: string;
  children?: ExtendedTreeItemProps[];
};

export type AssemblyData = {
  id: string;
  parentId?: string;
  nodeType: string;
  title: string;
  hasChild?: boolean;
  width?: number;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  fillColor?: string;
  fillStyle?: string;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: string;
};
