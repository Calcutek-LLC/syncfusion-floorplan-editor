import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import './index.css';
import ProjectDrawing from './pages/project-drawing';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NCaF1cWmhBYVFxWmFZfVpgfV9CZ1ZUTGY/P1ZhSXxXdk1jXX9dcXZQQmReV0c='
);

function App() {
  return <ProjectDrawing />;
}

export default App;
