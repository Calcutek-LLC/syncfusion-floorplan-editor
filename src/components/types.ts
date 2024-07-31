export type NodeType = 'folder' | 'assembly';
export type ExtendedTreeItemProps = {
  nodeType?: NodeType;
  id: string;
  label: string;
  children?: ExtendedTreeItemProps[];
};
