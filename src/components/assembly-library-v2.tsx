import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import './../App.css';
let treeObj: TreeViewComponent;
const AssemblyLibraryV2 = ({ diagramWrapperInstanceRef, treeData }) => {
  const fields = {
    dataSource: treeData,
    id: 'id',
    text: 'title',
    parentID: 'parentId',
    hasChildren: 'hasChild',
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
      ref={(treeview) => {
        treeObj = treeview;
      }}
      cssClass="custom"
      allowEditing={false}
      allowDragAndDrop={true}
      onClick={addNode}
      keyPress={keyPress}
    />
  );
};

export default AssemblyLibraryV2;
