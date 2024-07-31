import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { ZoomIn, ZoomOut } from '@mui/icons-material';

const DiagramToolbar = ({ loadDiagram, saveDiagram }) => {
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
        <IconButton color="inherit" aria-label="menu">
          <ZoomIn />
        </IconButton>
        <IconButton color="inherit" aria-label="menu">
          <ZoomOut />
        </IconButton>
        {/* <Button color="inherit">Select</Button>
      <Button color="inherit">Pan Tool</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default DiagramToolbar;
