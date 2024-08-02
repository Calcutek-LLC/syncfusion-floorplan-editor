import { randomId } from '@syncfusion/ej2-react-diagrams';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';

let treeObj: TreeViewComponent;

const AssemblyLibraryV2 = ({
  diagramInstanceRef,
  treeData,
  getAssemblyData,
}) => {
  const fields = {
    dataSource: treeData,
    id: 'id',
    text: 'label',
    parentID: 'parentId',
    hasChildren: 'hasChild',
  };

  const addNode = () => {
    if (treeObj.selectedNodes.length > 0) {
      const assemblyTreeNodeId = treeObj.selectedNodes[0];
      console.log(assemblyTreeNodeId);
      const assemblyNode = treeData.find(
        (node) => node.id === assemblyTreeNodeId
      );
      console.log(assemblyNode);
      const assemblyData = getAssemblyData(assemblyTreeNodeId);
      const node = {
        id: 'node_' + randomId(),
        width: assemblyData.width ?? 50,
        height: assemblyData.height ?? 50,
        offsetX: 100,
        offsetY: 100,
        minWidth: assemblyData.minWidth ?? 50,
        maxWidth: assemblyData.maxWidth ?? 200,
        minHeight: assemblyData.maxHeight ?? 50,
        maxHeight: assemblyData.maxHeight ?? 200,
        style: {
          fill: assemblyData.fill,
          strokeColor: 'white',
          strokeWidth: 1,
          opacity: 0.4,
        },
        annotations: [
          {
            id: 'label_' + randomId(),
            content: assemblyNode.label,
            offset: {
              x: 0.5,
              y: 0.5,
            },
          },
        ],
      };
      diagramInstanceRef.current.add(node);
      diagramInstanceRef.current.dataBind();
    }
  };

  const keyPress = (args: any) => {
    if (args.event.key === 'Enter') {
      addNode();
    }
  };

  return (
    <TreeViewComponent
      fields={fields}
      ref={(treeview) => {
        treeObj = treeview;
      }}
      allowEditing={false}
      allowDragAndDrop={true}
      onClick={addNode}
      keyPress={keyPress}
    />
  );
};

export default AssemblyLibraryV2;
