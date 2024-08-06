import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';

let treeObj: TreeViewComponent;
const AssemblyLibraryV2 = ({ diagramWrapperInstanceRef, treeData }) => {
  const fields = {
    dataSource: treeData,
    id: 'id',
    text: 'title',
    parentID: 'parentId',
    hasChildren: 'hasChild',
    iconCss: 'nodeType',
  };

  const addNode = () => {
    if (treeObj.selectedNodes.length > 0) {
      const assemblyTreeNodeId = treeObj.selectedNodes[0];
      console.log(assemblyTreeNodeId);
      diagramWrapperInstanceRef.current.addNewAssemblyNodeInstance(
        assemblyTreeNodeId
      );
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
      id="treeview"
      ref={(treeview) => {
        treeObj = treeview;
      }}
      allowEditing={false}
      allowDragAndDrop={true}
      onClick={addNode}
      keyPress={keyPress}
      cssClass="custom"
    />
  );
};

export default AssemblyLibraryV2;
