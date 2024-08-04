import { Box, Grid } from '@mui/material';
import { DiagramTestData, getAllAssemblies } from '../components/diagram-data';
import { useRef } from 'react';
import AssemblyLibraryV2 from '../components/assembly-library-v2';
import {
  PaneDirective,
  PanesDirective,
  SplitterComponent,
} from '@syncfusion/ej2-react-layouts';
import DiagramComponentWrapper from '../components/diagram-component-wrapper';

const ProjectDrawing = () => {
  const diagramWrapperInstanceRef = useRef(null);
  const splitterInstance = useRef<SplitterComponent>(null);
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
      <Box sx={{ marginTop: '10px' }}>
        <AssemblyLibraryV2
          diagramWrapperInstanceRef={diagramWrapperInstanceRef}
          treeData={treeData}
        />
      </Box>
    );
  };

  const diagramElement = () => {
    return (
      <Grid>
        <DiagramComponentWrapper
          loadDiagram={loadDiagram}
          saveDiagram={saveDiagram}
          ref={(diagram) => {
            diagramWrapperInstanceRef.current = diagram;
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
        height: '100vh',
        width: '100vw',
      }}
    >
      <SplitterComponent height="100%" width="100%" ref={splitterInstance}>
        <PanesDirective>
          <PaneDirective
            size={'20%'}
            min={'15%'}
            content={assemblyLibraryElement.bind(this)}
          />
          <PaneDirective
            size={'80%'}
            min={'50%'}
            content={diagramElement.bind(this)}
          />
        </PanesDirective>
      </SplitterComponent>
    </Grid>
  );
};

export default ProjectDrawing;
