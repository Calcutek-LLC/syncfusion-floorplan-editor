import { red } from '@mui/material/colors';
import { DiagramTools } from '@syncfusion/ej2-react-diagrams';
import {
  ItemDirective,
  ItemsDirective,
  ToolbarComponent,
} from '@syncfusion/ej2-react-navigations';

const DiagramToolbar = ({ diagramInstanceRef, loadDiagram, saveDiagram }) => {
  const drawPolyLine = () => {
    const polyline = { id: 'connector1', type: 'Polyline' };
    diagramInstanceRef.current.drawingObject = polyline;
    diagramInstanceRef.current.tool = DiagramTools.DrawOnce;
    diagramInstanceRef.current.dataBind();
  };

  const addNode = () => {
    const node = {
      id: 'node1',
      width: 100,
      height: 100,
      offsetX: 100,
      offsetY: 100,
      style: {
        fill: '#6BA5D7',
        strokeColor: 'white',
        strokeWidth: 1,
      },
      annotations: [
        {
          id: 'label1',
          content: 'Rectangle1',
          offset: {
            x: 0.5,
            y: 0.5,
          },
          style: {
            color: 'white',
          },
        },
      ],
    };
    diagramInstanceRef.current.add(node);
    diagramInstanceRef.current.dataBind();
  };

  const cut = () => {
    diagramInstanceRef.current.cut();
  };

  const copy = () => {
    diagramInstanceRef.current.copy();
  };

  const paste = () => {
    diagramInstanceRef.current.paste();
  };

  const undo = () => {
    diagramInstanceRef.current.undo();
  };

  const redo = () => {
    diagramInstanceRef.current.redo();
  };

  const zoomIn = () => {
    let zoomin: any = { type: 'ZoomIn', zoomFactor: 0.2 };
    diagramInstanceRef.current.zoomTo(zoomin);
  };

  const zoomout = () => {
    let zoomout: any = { type: 'ZoomOut', zoomFactor: 0.2 };
    diagramInstanceRef.current.zoomTo(zoomout);
  };

  const selectObject = () => {
    diagramInstanceRef.current.clearSelection();
    diagramInstanceRef.current.drawingObject = {};
    diagramInstanceRef.current.tool =
      DiagramTools.SingleSelect | DiagramTools.MultipleSelect;
  };

  const panTool = () => {
    diagramInstanceRef.current.tool = DiagramTools.ZoomPan;
  };

  const reset = () => {
    diagramInstanceRef.current.clear();
  };

  const fitToPage = () => {
    diagramInstanceRef.current.fitToPage();
  };

  const bringIntoView = () => {
    if (diagramInstanceRef.current.selectedItems.nodes.length > 0) {
      let bound: any =
        diagramInstanceRef.current.selectedItems.nodes[0].wrapper.bounds;
      diagramInstanceRef.current.bringIntoView(bound);
    }
  };

  const bringIntoCenter = () => {
    if (diagramInstanceRef.current.selectedItems.nodes.length > 0) {
      let bound: any =
        diagramInstanceRef.current.selectedItems.nodes[0].wrapper.bounds;
      diagramInstanceRef.current.bringToCenter(bound);
    }
  };

  return (
    <ToolbarComponent
      // ref={(toolbar) => (toolbarEditor = toolbar)}
      id="toolbar_diagram"
    >
      <ItemsDirective>
        <ItemDirective
          text="OPEN"
          tooltipText="Load Diagram"
          click={loadDiagram}
        />

        <ItemDirective
          text="SAVE"
          tooltipText="Save Diagram"
          click={saveDiagram}
        />

        <ItemDirective
          text="POLY LINE"
          tooltipText="Poly Line"
          click={drawPolyLine}
        />
        <ItemDirective text="ADD NODE" tooltipText="Add Node" click={addNode} />
        <ItemDirective type="Separator" />
        <ItemDirective
          prefixIcon="e-icons e-zoom-in"
          tooltipText="Zoom In"
          click={zoomIn}
        />
        <ItemDirective
          prefixIcon="e-icons e-zoom-out"
          tooltipText="Zoom Out"
          click={zoomout}
        />

        <ItemDirective type="Separator" />
        <ItemDirective
          prefixIcon="e-icons e-mouse-pointer"
          tooltipText="Select"
          click={selectObject}
        />
        <ItemDirective
          prefixIcon="e-icons e-pan"
          tooltipText="Pan Tool"
          click={panTool}
        />
        <ItemDirective type="Separator" />

        <ItemDirective
          prefixIcon="e-icons e-cut"
          tooltipText="Cut"
          click={cut}
        />
        <ItemDirective
          prefixIcon="e-icons e-copy"
          tooltipText="Copy"
          click={copy}
        />
        <ItemDirective
          prefixIcon="e-icons e-paste"
          tooltipText="Paste"
          click={paste}
        />
        <ItemDirective type="Separator" />

        <ItemDirective
          prefixIcon="e-icons e-undo"
          tooltipText="Undo"
          click={undo}
        />
        <ItemDirective
          prefixIcon="e-icons e-redo"
          tooltipText="Redo"
          click={redo}
        />
        <ItemDirective
          prefixIcon="e-icons e-reset"
          tooltipText="Reset"
          click={reset}
        />

        <ItemDirective type="Separator" />
        <ItemDirective
          prefixIcon="e-icons e-zoom-to-fit"
          tooltipText="Fit To Page"
          click={fitToPage}
        />
        <ItemDirective type="Separator" />
        <ItemDirective
          prefixIcon="e-icons e-bring-to-view"
          tooltipText="Bring Into View"
          click={bringIntoView}
          disabled={true}
        />
        <ItemDirective
          prefixIcon="e-icons e-bring-to-center"
          tooltipText="Bring Into Center"
          click={bringIntoCenter}
          disabled={true}
        />
      </ItemsDirective>
    </ToolbarComponent>

    // <AppBar
    //   position="static"
    //   sx={{
    //     height: '50px',
    //     bgcolor: 'steelblue',
    //   }}
    // >
    //   <Toolbar>
    //     <Button color="inherit" onClick={loadDiagram}>
    //       Load
    //     </Button>
    //     <Button color="inherit" onClick={saveDiagram}>
    //       Save
    //     </Button>
    //     <Button
    //       color="inherit"
    //       onClick={() => {
    //         diagramInstanceRef.current.clear();
    //       }}
    //     >
    //       CLEAR
    //     </Button>
    //     <IconButton
    //       color="inherit"
    //       aria-label="menu"
    //       onClick={() => {
    //         diagramInstanceRef.current.undo();
    //       }}
    //     >
    //       <Undo />
    //     </IconButton>
    //     <IconButton
    //       color="inherit"
    //       aria-label="menu"
    //       onClick={() => {
    //         diagramInstanceRef.current.redo();
    //       }}
    //     >
    //       <Redo />
    //     </IconButton>
    //     <IconButton color="inherit" aria-label="menu">
    //       <ZoomIn />
    //     </IconButton>
    //     <IconButton color="inherit" aria-label="menu">
    //       <ZoomOut />
    //     </IconButton>
    //     <Button color="inherit" onClick={drawPolyLine}>
    //       Draw Polyline
    //     </Button>
    //     <Button color="inherit" onClick={addNode}>
    //       Add Node
    //     </Button>
    //     {/* <Button color="inherit">Select</Button>
    //   <Button color="inherit">Pan Tool</Button> */}
    //   </Toolbar>
    // </AppBar>
  );
};

export default DiagramToolbar;
