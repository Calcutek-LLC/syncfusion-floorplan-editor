import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { ZoomIn, ZoomOut, Undo, Redo } from '@mui/icons-material';
import { DiagramTools } from '@syncfusion/ej2-react-diagrams';

const DiagramToolbar = ({ diagramInstanceRef, loadDiagram, saveDiagram }) => {
  const drawPolyLine = () => {
    const polyline = { id: 'connector1', type: 'Polyline' };
    diagramInstanceRef.current.drawingObject = polyline;
    diagramInstanceRef.current.tool = DiagramTools.DrawOnce;
    diagramInstanceRef.current.dataBind();
  };

  return (
    <AppBar
      position="static"
      sx={{
        height: '50px',
        bgcolor: 'steelblue',
      }}
    >
      <Toolbar>
        <Button color="inherit" onClick={loadDiagram}>
          Load
        </Button>
        <Button color="inherit" onClick={saveDiagram}>
          Save
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            diagramInstanceRef.current.clear();
          }}
        >
          CLEAR
        </Button>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={() => {
            diagramInstanceRef.current.undo();
          }}
        >
          <Undo />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={() => {
            diagramInstanceRef.current.redo();
          }}
        >
          <Redo />
        </IconButton>
        <IconButton color="inherit" aria-label="menu">
          <ZoomIn />
        </IconButton>
        <IconButton color="inherit" aria-label="menu">
          <ZoomOut />
        </IconButton>
        <Button color="inherit" onClick={drawPolyLine}>
          Draw Polyline
        </Button>
        {/* <Button color="inherit">Select</Button>
      <Button color="inherit">Pan Tool</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default DiagramToolbar;
