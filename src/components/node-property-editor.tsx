import { Box } from "@mui/material";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Edit,
} from "@syncfusion/ej2-react-grids";
import { forwardRef, useImperativeHandle, useState } from "react";

type NodePropertyEditorProps = {
  diagramWrapperInstanceRef: any;
  onPropertyUpdate: (updatedData: any) => void;
};

const NodePropertyEditor = forwardRef((props: NodePropertyEditorProps, ref) => {
  const [selectedItems, setSelectedItems] = useState(null);
  const [propertyData, setPropertyData] = useState([]);
  useImperativeHandle(ref, () => ({
    loadSelectedItems(data) {
      setSelectedItems(data);
      console.log(data);
      if (data.length > 0) {
        const node = data[0]; //handle only one node for now
        const nodeData = [
          { field: "Width", value: node.width },
          { field: "Length", value: node.height },
        ];
        setPropertyData(nodeData);
      }
    },
  }));

  const notifyParentComponent = (updatedData) => {
    const updatedItems = selectedItems.map((item) => ({ ...item }));
    updatedItems.forEach((item) => {
      if (updatedData.field === "Width") {
        item.width = updatedData.value;
      }
      if (updatedData.field === "Length") {
        item.height = updatedData.value;
      }
    });
    if (props.onPropertyUpdate) {
      props.onPropertyUpdate(selectedItems);
    }
  };

  const onActionComplete = (args) => {
    if (args.requestType === "save") {
      const updatedData = args.data;
      notifyParentComponent(updatedData);
    }
  };

  return (
    <Box
      sx={{
        padding: "12px",
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <h3>Property Editor</h3>
      <GridComponent
        width={"100%"}
        dataSource={propertyData}
        editSettings={{ allowEditing: true }}
        actionComplete={onActionComplete}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="field"
            headerText="Field"
            isPrimaryKey={true}
            width="100"
          />
          <ColumnDirective
            field="value"
            headerText="Value"
            width="100"
            editType="string"
          />
        </ColumnsDirective>
        <Inject services={[Edit]} />
      </GridComponent>
    </Box>
  );
});

export default NodePropertyEditor;
