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
    const zoomin = { type: 'ZoomIn', zoomFactor: 0.2 };
    diagramInstanceRef.current.zoomTo(zoomin);
  };

  const zoomout = () => {
    const zoomout = { type: 'ZoomOut', zoomFactor: 0.2 };
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
      const bound =
        diagramInstanceRef.current.selectedItems.nodes[0].wrapper.bounds;
      diagramInstanceRef.current.bringIntoView(bound);
    }
  };

  const bringIntoCenter = () => {
    if (diagramInstanceRef.current.selectedItems.nodes.length > 0) {
      const bound =
        diagramInstanceRef.current.selectedItems.nodes[0].wrapper.bounds;
      diagramInstanceRef.current.bringToCenter(bound);
    }
  };

  const alignLeft = () => {
    diagramInstanceRef.current.align('Left');
  };

  const alignCenter = () => {
    diagramInstanceRef.current.align('Center');
  };

  const alignRight = () => {
    diagramInstanceRef.current.align('Right');
  };

  const alignTop = () => {
    diagramInstanceRef.current.align('Top');
  };

  const alignMiddle = () => {
    diagramInstanceRef.current.align('Middle');
  };

  const alignBottom = () => {
    diagramInstanceRef.current.align('Bottom');
  };

  const sameWidth = () => {
    diagramInstanceRef.current.sameSize(
      'Width',
      diagramInstanceRef.current.selectedItems.nodes
    );
  };

  const sameHeight = () => {
    diagramInstanceRef.current.sameSize(
      'Height',
      diagramInstanceRef.current.selectedItems.nodes
    );
  };

  const sameSize = () => {
    diagramInstanceRef.current.sameSize(
      'Size',
      diagramInstanceRef.current.selectedItems.nodes
    );
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

        <ItemDirective type="Separator" />
        <ItemDirective
          prefixIcon="sf-diagram-icon-align-left-1"
          tooltipText="Align Left"
          click={alignLeft}
        />
        <ItemDirective
          prefixIcon="sf-diagram-icon-align-center-1"
          tooltipText="Align Center"
          click={alignCenter}
        />
        <ItemDirective
          prefixIcon="sf-diagram-icon-align-right-1"
          tooltipText="Align Right"
          click={alignRight}
        />

        <ItemDirective
          prefixIcon="sf-diagram-icon-align-top-1"
          tooltipText="Align Top"
          click={alignTop}
        />

        <ItemDirective
          prefixIcon="sf-diagram-icon-align-middle-1"
          tooltipText="Align Middle"
          click={alignMiddle}
        />

        <ItemDirective
          prefixIcon="sf-diagram-icon-align-bottom-1"
          tooltipText="Align Bottom"
          click={alignBottom}
        />
        <ItemDirective type="Separator" />

        <ItemDirective
          prefixIcon="sf-diagram-icon-same-width"
          tooltipText="Same Width"
          click={sameWidth}
        />

        <ItemDirective
          prefixIcon="sf-diagram-icon-same-height"
          tooltipText="Same Height"
          click={sameHeight}
        />

        <ItemDirective
          prefixIcon="sf-diagram-icon-same-size"
          tooltipText="Same Size"
          click={sameSize}
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
