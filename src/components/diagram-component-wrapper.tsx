import { Grid } from "@mui/material";
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
} from "@syncfusion/ej2-react-diagrams";
import DiagramToolbar from "./diagram-toolbar";
import { getAssemblyData } from "../diagram-data";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { getTool, handles } from "./user-handles";
import "./diagram-component-wrapper.css";
import { AssemblyData } from "./types";

let diagramInstance: DiagramComponent;

const assemblyNodeTemplate = (props) => {
  console.log(props);
  const assemblyData = props.data as AssemblyData;
  const border = `${assemblyData.borderColor} ${assemblyData.borderWidth}px ${assemblyData.borderStyle}`;
  return (
    <div
      style={{ border: border, backgroundColor: assemblyData.fillColor }}
      className="rectangle"
    ></div>
  );
};

const getNewAssemblyNodeInstance = (id: string): any => {
  const assemblyData = getAssemblyData(id);
  if (assemblyData === undefined) return null;
  const node = {
    id: "node_" + randomId(),
    shape: {
      type: "HTML",
    },
    data: {
      ...assemblyData,
    },
    content: assemblyData.title,
    width: assemblyData.width ?? 50,
    height: assemblyData.height ?? 50,
    offsetX: 100,
    offsetY: 10,
    minWidth: assemblyData.minWidth ?? 50,
    maxWidth: assemblyData.maxWidth ?? 200,
    minHeight: assemblyData.maxHeight ?? 50,
    maxHeight: assemblyData.maxHeight ?? 200,
    style: {
      // fill: assemblyData.fillColor,
      // strokeColor: 'white',
      // strokeWidth: 1,
      opacity: 0.6,
    },
    annotations: [
      {
        id: "label_" + randomId(),
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
};

const DiagramComponentWrapper = forwardRef(
  (props: DiagramComponentWrapperProps, ref) => {
    const diagramInstanceRef = useRef(null);
    // React.useEffect(() => {
    //   diagramInstance.fitToPage();
    // }, []);

    useImperativeHandle(ref, () => ({
      loadDiagramEx(data) {
        diagramInstance.loadDiagram(data);
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
    }));

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
          width={"100%"}
          height={"750px"}
          rulerSettings={{
            showRulers: true,
            horizontalRuler: {
              interval: 10,
              segmentWidth: 100,
              thickness: 35,
              tickAlignment: "LeftOrTop",
            },
            verticalRuler: {
              interval: 10,
              segmentWidth: 100,
              thickness: 35,
              tickAlignment: "RightOrBottom",
            },
          }}
          scrollSettings={{
            //Sets the scroll limit
            scrollLimit: "Diagram",
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
          addInfo={true}
          selectedItems={{
            constraints:
              SelectorConstraints.ToolTip |
              SelectorConstraints.ResizeAll |
              SelectorConstraints.UserHandle,
            userHandles: handles,
          }}
          selectionChange={(args: ISelectionChangeEventArgs) => {
            if (args.state == "Changed") {
              // console.log(args);
              const selectedItems = args.newValue as any;
              const selectItemProperties = [];
              if (selectedItems.length > 0) {
                // const node = selectedItems[0];
                // console.log(node.properties);
                selectedItems.forEach((item) => {
                  // console.log(item);
                  const itemProperty = {
                    nodeId: item.properties["id"],
                    width: item.properties["width"],
                    height: item.properties["height"],
                    data: item.data,
                  };
                  // console.log(itemProperty);
                  selectItemProperties.push(itemProperty);
                });

                // diagramInstance.nodes.find((node) => {
                //   if (node.id === selectItemProperties[0].nodeId) {
                //     console.log("found");
                //     // node.width = selectItemProperties[0].width - 10;
                //     // console.log(node);
                //   }
                // });

                console.log(selectItemProperties);
              }
            }
          }}
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
