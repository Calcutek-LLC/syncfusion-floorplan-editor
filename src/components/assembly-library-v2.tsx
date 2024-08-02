import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';

let treeObj: TreeViewComponent;

const AssemblyLibraryV2 = ({ treeData }) => {
  const fields: Object = {
    dataSource: treeData,
    id: 'id',
    text: 'label',
    parentID: 'parentId',
    hasChildren: 'hasChild',
  };

  return (
    <TreeViewComponent
      fields={fields}
      ref={(treeview) => {
        treeObj = treeview;
      }}
      allowEditing={true}
      //   keyPress={keyPress}
      //   nodeEdited={nodeEdited}
      //   nodeSelected={nodeSelected}
      //   allowDragAndDrop={true}
      //   nodeClicked={nodeClicked}
    />
  );
};

export default AssemblyLibraryV2;
