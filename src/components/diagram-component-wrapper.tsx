import { Box, Grid, Stack } from '@mui/material';
import {
  ConnectorModel,
  Diagram,
  DiagramComponent,
  DiagramContextMenu,
  Inject,
  SnapConstraints,
  Snapping,
  UndoRedo,
} from '@syncfusion/ej2-react-diagrams';
import DiagramToolbar from './diagram-toolbar';
import AssemblyLibrary from './assembly-library';
import { DiagramTestData } from './diagram-data';
import { useRef } from 'react';

let diagramInstance: DiagramComponent;

const treeData: any[] = [
  {
    id: '1',
    label: 'Project Construction Site Objects',
    children: [
      { id: '11', label: 'Construction Area', disabled: true },
      { id: '12', label: 'Hazard Waste Disposal Area' },
      { id: '13', label: 'Parking Area' },
    ],
  },
  {
    id: '2',
    label: 'Building Zone Objects',
    nodeType: 'folder',
    children: [
      {
        id: '21',
        label: 'Building Structure',
        nodeType: 'folder',
        children: [{ id: '211', label: 'Building Footprint' }],
      },
      {
        id: '22',
        label: 'Floor',
        nodeType: 'folder',
        children: [
          { id: '221', label: 'Floor 1' },
          { id: '222', label: 'Floor 2' },
          { id: '223', label: 'Floor 3' },
        ],
      },
      {
        id: '23',
        label: 'Roof',
        nodeType: 'folder',
        children: [{ id: '231', label: 'Roof Area' }],
      },
      {
        id: '24',
        label: 'Elevators',
        nodeType: 'folder',
        children: [
          { id: '241', label: 'Elevator 1 (Visitor Passenger)' },
          { id: '242', label: 'Elevator 2 (Patient)' },
          { id: '243', label: 'Elevator 3 (Cargo)' },
        ],
      },
      {
        id: '25',
        label: 'Escalators',
        nodeType: 'folder',
        children: [
          { id: '251', label: 'Escalator 1' },
          { id: '252', label: 'Escalator 2' },
        ],
      },
      {
        id: '26',
        label: 'Exit Areas',
        nodeType: 'folder',
        children: [
          { id: '261', label: 'Exit Area 1' },
          { id: '262', label: 'Exit Area 2' },
        ],
      },
      {
        id: '27',
        label: 'Mechanical Rooms',
        nodeType: 'folder',
        children: [
          { id: '271', label: 'Mechanical Room 1' },
          { id: '272', label: 'Mechanical Room 2' },
        ],
      },
    ],
  },
  {
    id: '3',
    label: 'Hospital Departments',
    nodeType: 'folder',
    children: [
      {
        id: '31',
        label: 'ICU Department',
        children: [{ id: '311', label: 'ICU Patient Room Object' }],
      },
    ],
  },
];

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
            <AssemblyLibrary treeData={treeData} />
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
          height={'900px'}
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
          click={(args) => {
            if (args.actualObject != undefined) {
              if (args.button == 'Left') {
                // debugger;
                const node = {
                  id: 'node1',
                  style: {
                    fill: 'lightblue',
                    strokeColor: 'white',
                    opacity: 0.4,
                    StrokeStyle: 'Dotted',
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
                  node.shape.points.push(args.actualObject.segments[i].point);
                }
                node.shape.points.push(args.actualObject.targetPoint);
                node.offsetX = args.actualObject.wrapper.offsetX;
                node.offsetY = args.actualObject.wrapper.offsetY;
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
          getNodeDefaults={(obj: Node, diagram: Diagram) => {
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
