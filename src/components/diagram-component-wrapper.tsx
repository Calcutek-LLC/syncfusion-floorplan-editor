import { Box, Grid, Stack } from '@mui/material';
import {
  ConnectorModel,
  Diagram,
  DiagramComponent,
  DiagramContextMenu,
  Inject,
  NodeModel,
  randomId,
  SelectorConstraints,
  SnapConstraints,
  Snapping,
  ToolBase,
  UndoRedo,
  NodeConstraints,
  DiagramShapeModel,
} from '@syncfusion/ej2-react-diagrams';
import DiagramToolbar from './diagram-toolbar';
import { assembliesV2, DiagramTestData } from './diagram-data';
import { useRef } from 'react';
import { getTool, handles } from './user-handles';
import AssemblyLibraryV2 from './assembly-library-v2';

export let diagramInstance: DiagramComponent;

const DiagramComponentWrapper = () => {
  const diagramInstanceRef = useRef(null);
  return (
    <Grid
      container
      spacing={2}
      sx={{
        mt: 10,
        height: '100vh',
        width: '100vw',
      }}
    >
      <Grid item xs={2}>
        {/* Sidebar content goes here */}
        <Box sx={{ minHeight: 352, minWidth: 250, height: 'max-content' }}>
          <Stack>
            <AssemblyLibraryV2 treeData={assembliesV2} />
            {/* <AssemblyLibrary treeData={treeData} /> */}
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <DiagramToolbar
          loadDiagram={loadDiagram}
          saveDiagram={saveDiagram}
          diagramInstanceRef={diagramInstanceRef}
        />
        <DiagramComponent
          id="diagram"
          ref={(diagram) => {
            diagramInstance = diagram;
            diagramInstanceRef.current = diagram;
          }}
          width={'100%'}
          height={'750px'}
          rulerSettings={{
            showRulers: true,
            horizontalRuler: {
              interval: 5,
              segmentWidth: 100,
              thickness: 25,
              tickAlignment: 'LeftOrTop',
            },
            verticalRuler: {
              interval: 5,
              segmentWidth: 100,
              thickness: 35,
              tickAlignment: 'RightOrBottom',
            },
          }}
          scrollSettings={{
            //Sets the scroll limit
            scrollLimit: 'Limited',
          }}
          contextMenuSettings={{
            show: true,
            // Hides the default context menu items
            showCustomMenuOnly: false,
          }}
          serializationSettings={{ preventDefaults: true }}
          snapSettings={{
            snapObjectDistance: 5,
            constraints:
              SnapConstraints.SnapToObject |
              SnapConstraints.SnapToLines |
              SnapConstraints.ShowLines,
          }}
          selectedItems={{
            constraints:
              SelectorConstraints.ToolTip |
              SelectorConstraints.ResizeAll |
              SelectorConstraints.UserHandle,
            userHandles: handles,
          }}
          //set CustomTool
          getCustomTool={(action: string): ToolBase =>
            getTool(diagramInstance, action)
          }
          click={(args) => {
            if (args.actualObject != undefined) {
              if (args.button == 'Left') {
                // debugger;
                let node: NodeModel = {
                  id: 'node_' + randomId(),
                  style: {
                    fill: 'lightblue',
                    strokeColor: 'white',
                    opacity: 0.4,
                  },
                  shape: {
                    type: 'Basic',
                    shape: 'Polygon',
                    points: [],
                  },
                };
                for (
                  let i = 0;
                  i < args.actualObject.segments.length - 1;
                  i++
                ) {
                  (node.shape as DiagramShapeModel).points.push(
                    args.actualObject.segments[i].point
                  );
                }
                (node.shape as DiagramShapeModel).points.push(
                  args.actualObject.targetPoint
                );
                node.offsetX = args.actualObject.wrapper.offsetX;
                node.offsetY = args.actualObject.wrapper.offsetY;
                node.constraints = NodeConstraints.None;
                diagramInstance.remove(args.actualObject);
                diagramInstance.add(node);
              }
            }
          }}
          layout={
            {
              // //Configures  layout
              // type: '',
              // margin: { top: 20 },
              // getLayoutInfo: (node: Node, tree: TreeInfo) => {
              // },
            }
          }
          //   selectionChange={(args: ISelectionChangeEventArgs) => {}}
          //   dataSourceSettings={{}}
          getNodeDefaults={(obj: NodeModel, diagram: Diagram) => {
            //Sets the default values of Node
            return obj;
          }}
          getConnectorDefaults={(
            //Sets the default values of connector
            connector: ConnectorModel,
            diagram: Diagram
          ) => {
            return connector;
          }}
          //   setNodeTemplate={(obj: Node, diagram: Diagram): Container => {
          //     //customization of the node.
          //     return setNodeTemplate(obj, diagram);
          //   }}
        >
          <Inject services={[UndoRedo, Snapping, DiagramContextMenu]} />
        </DiagramComponent>
      </Grid>
      <Grid item xs={2}>
        {/* Sidebar content goes here */}
      </Grid>
    </Grid>
  );
};

const loadDiagram = () => {
  diagramInstance.loadDiagram(JSON.stringify(DiagramTestData));
};
const saveDiagram = () => {
  const data = diagramInstance.saveDiagram();
  console.log(data);
};

export default DiagramComponentWrapper;
