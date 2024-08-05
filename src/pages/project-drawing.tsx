import { Box, Grid } from "@mui/material";
import { useRef } from "react";
import AssemblyLibraryV2 from "../components/assembly-library-v2";
import {
  PaneDirective,
  PanesDirective,
  SplitterComponent,
} from "@syncfusion/ej2-react-layouts";
import DiagramComponentWrapper from "../components/diagram-component-wrapper";
import { DiagramTestData, getAllAssemblies } from "../diagram-data";
import NodePropertyEditor from "../components/node-property-editor";

const ProjectDrawing = () => {
  const diagramWrapperInstanceRef = useRef(null);
  const nodePropertyEditornstanceRef = useRef(null);
  const splitterInstanceRef = useRef<SplitterComponent>(null);

  const treeData = getAllAssemblies();

  const loadDiagram = () => {
    diagramWrapperInstanceRef.current.loadDiagramEx(
      JSON.stringify(DiagramTestData)
    );
  };

  const saveDiagram = () => {
    const data = diagramWrapperInstanceRef.current.saveDiagramEx();
    console.log(data);
  };

  const assemblyLibraryElement = () => {
    return (
      <Box sx={{ margin: "12px" }}>
        <AssemblyLibraryV2
          diagramWrapperInstanceRef={diagramWrapperInstanceRef}
          treeData={treeData}
        />
      </Box>
    );
  };

  const nodePropertyEditorElement = () => {
    return (
      <Box sx={{ paddingRight: "20px" }}>
        <NodePropertyEditor
          ref={(propertyEditor) => {
            nodePropertyEditornstanceRef.current = propertyEditor;
          }}
          diagramWrapperInstanceRef={diagramWrapperInstanceRef}
          onPropertyUpdate={(updatedData) => {
            diagramWrapperInstanceRef.current.onNodePropertyUpdated(
              updatedData
            );
          }}
        />
      </Box>
    );
  };

  const diagramElement = () => {
    return (
      <Grid>
        <DiagramComponentWrapper
          ref={(diagram) => {
            diagramWrapperInstanceRef.current = diagram;
          }}
          loadDiagram={loadDiagram}
          saveDiagram={saveDiagram}
          handleDiagramSelectedItemsChanged={(data) => {
            nodePropertyEditornstanceRef.current.loadSelectedItems(data);
          }}
        />
      </Grid>
    );
  };

  return (
    <Grid
      container
      sx={{
        mt: 10,
        height: "100vh",
        width: "100vw",
      }}
    >
      <SplitterComponent height="100%" width="100%" ref={splitterInstanceRef}>
        <PanesDirective>
          <PaneDirective
            size={"15%"}
            min={"10%"}
            content={assemblyLibraryElement.bind(this)}
          />
          <PaneDirective
            size={"65%"}
            min={"50%"}
            content={diagramElement.bind(this)}
          />
          <PaneDirective
            size={"20%"}
            min={"10%"}
            content={nodePropertyEditorElement.bind(this)}
          />
        </PanesDirective>
      </SplitterComponent>
    </Grid>
  );
};

export default ProjectDrawing;
