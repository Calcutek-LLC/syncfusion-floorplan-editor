import { Grid } from '@mui/material';
import {
  ConnectorModel,
  Diagram,
  DiagramComponent,
  DiagramContextMenu,
  Inject,
  ISelectionChangeEventArgs,
  NodeModel,
  randomId,
  SelectorConstraints,
  SnapConstraints,
  Snapping,
  ToolBase,
  UndoRedo,
} from '@syncfusion/ej2-react-diagrams';
import DiagramToolbar from './diagram-toolbar';
import { getAssemblyData } from '../diagram-data';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { getTool, handles } from './user-handles';
import './diagram-component-wrapper.css';
import { AssemblyData } from './types';

let diagramInstance: DiagramComponent;
// let startBounds;
// let oldValues = [];

const assemblyNodeTemplate = (props) => {
  const assemblyData = props.addInfo as AssemblyData;
  const border = `${assemblyData.borderColor} ${assemblyData.borderWidth}px ${assemblyData.borderStyle}`;

  return (
    <div
      style={{
        border: border,
        ...(assemblyData.fillStyle === 'solid' && {
          backgroundColor: assemblyData.fillColor ?? 'transparent',
        }),
        ...(assemblyData.fillStyle === 'horizontal-lines' && {
          backgroundImage: `linear-gradient(to bottom, ${assemblyData.fillColor} 1px, transparent 1px)`,
          backgroundSize: '100% 10px',
          backgroundRepeat: 'repeat-y',
        }),
        ...(assemblyData.fillStyle === 'vertical-lines' && {
          backgroundImage: `linear-gradient(to right, ${assemblyData.fillColor} 1px, transparent 1px)`,
          backgroundSize: '10px 100%',
          backgroundRepeat: 'repeat-x',
        }),
        ...(assemblyData.fillStyle === 'dotted' && {
          backgroundImage: `linear-gradient(to right top, red 2px, transparent 1px)`,
          backgroundSize: '10px 10px',
          backgroundRepeat: 'repeat',
        }),
      }}
      className="rectangle"
    ></div>
  );
};

const getNewAssemblyNodeInstance = (id: string): any => {
  const assemblyData = getAssemblyData(id);
  if (assemblyData === undefined) return null;
  const node = {
    id: 'node_' + randomId(),
    shape: {
      type: 'HTML',
    },
    addInfo: {
      ...assemblyData,
    },
    content: assemblyData.title,
    width: assemblyData.width ?? 10,
    height: assemblyData.height ?? 10,
    offsetX: 100,
    offsetY: 100,
    minWidth: assemblyData.minWidth ?? 100,
    maxWidth: assemblyData.maxWidth ?? 1000,
    minHeight: assemblyData.minHeight ?? 100,
    maxHeight: assemblyData.maxHeight ?? 1000,
    style: {
      // fill: assemblyData.fillColor,
      // strokeColor: 'white',
      // strokeWidth: 1,
      opacity: assemblyData.fillStyle === 'solid' ? 0.6 : 1,
    },
    annotations: [
      {
        id: 'label_' + randomId(),
        content: assemblyData.title,
        offset: {
          x: 0.5,
          y: 0.5,
        },
      },
    ],
  };
  console.log(node);
  return node;
};

type DiagramComponentWrapperProps = {
  loadDiagram: () => void;
  saveDiagram: () => void;
  handleDiagramSelectedItemsChanged: (data: any) => void;
};

const DiagramComponentWrapper = forwardRef(
  (props: DiagramComponentWrapperProps, ref) => {
    const diagramInstanceRef = useRef(null);
    const [selectedItemProperties, setSelectedItemProperties] = useState(null);
    // React.useEffect(() => {
    //   diagramInstance.fitToPage();
    // }, []);

    useImperativeHandle(ref, () => ({
      loadDiagramEx(data) {
        diagramInstance.loadDiagram(data);
        diagramInstance.updateViewPort();
      },

      saveDiagramEx() {
        return diagramInstance.saveDiagram();
      },

      addNewAssemblyNodeInstance(id: string) {
        const node = getNewAssemblyNodeInstance(id);
        if (node === null) return;
        diagramInstance.add(node);
        diagramInstance.dataBind();
      },

      onNodePropertyUpdated(updatedData) {
        console.log('onNodePropertyUpdated');
        console.log(updatedData);
      },
    }));

    // const intersectRect = (r1, r2) => {
    //   return !(
    //     r2.left >= r1.right + 50 ||
    //     r2.right <= r1.left - 50 ||
    //     r2.top >= r1.bottom + 50 ||
    //     r2.bottom <= r1.top - 50
    //   );
    // };

    const handleSelectionChange = (args: ISelectionChangeEventArgs) => {
      if (args.state === 'Changed') {
        const selectedItems = args.newValue as any;
        const selectItemProperties = [];
        if (selectedItems.length > 0) {
          selectedItems.forEach((item) => {
            const itemProperty = {
              nodeId: item.properties['id'],
              width: item.properties['width'],
              height: item.properties['height'],
              data: item.data,
            };
            selectItemProperties.push(itemProperty);
          });

          setSelectedItemProperties(selectItemProperties);
          props.handleDiagramSelectedItemsChanged(selectItemProperties);
          // diagramInstance.nodes.find((node) => {
          //   if (node.id === selectItemProperties[0].nodeId) {
          //     console.log("found");
          //     // node.width = selectItemProperties[0].width - 10;
          //     // console.log(node);
          //   }
          // });
        } else {
          setSelectedItemProperties([]);
        }
      }
    };

    return (
      <Grid>
        <DiagramToolbar
          loadDiagram={props.loadDiagram}
          saveDiagram={props.saveDiagram}
          diagramInstanceRef={diagramInstanceRef}
        />
        <DiagramComponent
          id="diagram"
          ref={(diagram) => {
            diagramInstance = diagram;
            diagramInstanceRef.current = diagram;
          }}
          nodeTemplate={assemblyNodeTemplate}
          width={'100%'}
          height={'750px'}
          rulerSettings={{
            showRulers: true,
            horizontalRuler: {
              interval: 10,
              segmentWidth: 100,
              thickness: 35,
              tickAlignment: 'LeftOrTop',
            },
            verticalRuler: {
              interval: 10,
              segmentWidth: 100,
              thickness: 35,
              tickAlignment: 'RightOrBottom',
            },
          }}
          pageSettings={{
            orientation: 'Landscape',
            boundaryConstraints: 'Diagram',
            // Sets the Multiple page for diagram
            multiplePage: true,
            // Sets the Page Break for diagram
            showPageBreaks: true,
            width: 595,
            height: 842,
            margin: {
              // left: 10,
              // top: 10,
              // bottom: 10,
            },
          }}
          scrollSettings={{
            //Sets the scroll limit
            scrollLimit: 'Diagram',
            minZoom: 0.5,
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
              SelectorConstraints.Rotate |
              SelectorConstraints.ResizeAll |
              SelectorConstraints.UserHandle,
            userHandles: handles,
          }}
          selectionChange={handleSelectionChange}
          //set CustomTool
          getCustomTool={(action: string): ToolBase =>
            getTool(diagramInstance, action)
          }
          click={(args) => {
            if (args.actualObject != undefined) {
              // if (args.button == 'Left') {
              //   // debugger;
              //   let node: NodeModel = {
              //     id: 'node_' + randomId(),
              //     style: {
              //       fill: 'lightblue',
              //       strokeColor: 'white',
              //       opacity: 0.4,
              //     },
              //     shape: {
              //       type: 'Basic',
              //       shape: 'Polygon',
              //       points: [],
              //     },
              //   };
              //   for (
              //     let i = 0;
              //     i < args.actualObject.segments.length - 1;
              //     i++
              //   ) {
              //     (node.shape as DiagramShapeModel).points.push(
              //       args.actualObject.segments[i].point
              //     );
              //   }
              //   (node.shape as DiagramShapeModel).points.push(
              //     args.actualObject.targetPoint
              //   );
              //   node.offsetX = args.actualObject.wrapper.offsetX;
              //   node.offsetY = args.actualObject.wrapper.offsetY;
              //   node.constraints = NodeConstraints.None;
              //   diagramInstance.remove(args.actualObject);
              //   diagramInstance.add(node);
              // }
            }
          }}
          dragEnter={(args) => {
            const node = getNewAssemblyNodeInstance(args.dragData.id);
            args.dragItem = node;
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
          positionChange={(args) => {
            // let bounds;
            // if (args.state === 'Start') {
            //   oldValues = [];
            //   startBounds = args.source.wrapper.bounds;
            //   oldValues.push(args.oldValue);
            //   console.log(oldValues);
            // }
            // if (args.state === 'Completed') {
            //   const selectedObjBounds = args.source.wrapper.bounds;
            //   bounds = {
            //     left: selectedObjBounds.left,
            //     right: selectedObjBounds.right,
            //     bottom: selectedObjBounds.bottom,
            //     top: selectedObjBounds.top,
            //   };
            //   for (let i = 0; i < diagramInstance.nodes.length; i++) {
            //     if (
            //       diagramInstance.nodes[i].id !==
            //         diagramInstance.selectedItems.nodes[0].id &&
            //       intersectRect(diagramInstance.nodes[i].wrapper.bounds, bounds)
            //     ) {
            //       if (args.source instanceof Node) {
            //         args.source.offsetX = oldValues[0].offsetX;
            //         args.source.offsetY = oldValues[0].offsetY;
            //         diagramInstance.dataBind();
            //       } else {
            //         args.source.nodes[0].offsetX = oldValues[0].offsetX;
            //         args.source.nodes[0].offsetY = oldValues[0].offsetY;
            //         diagramInstance.dataBind();
            //       }
            //     } else {
            //       oldValues.push(args.oldValue);
            //     }
            //   }
            // }
          }}
          // setNodeTemplate={(obj: Node, diagram: Diagram): Container => {
          //   //customization of the node.
          //   return setNodeTemplate(obj, diagram);
          // }}
        >
          <Inject services={[UndoRedo, Snapping, DiagramContextMenu]} />
        </DiagramComponent>
      </Grid>
    );
  }
);

export default DiagramComponentWrapper;
