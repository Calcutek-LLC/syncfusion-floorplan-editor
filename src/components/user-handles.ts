import {
  Diagram,
  ToolBase,
  UserHandleModel,
} from '@syncfusion/ej2-react-diagrams';
import { CloneTool } from './clone-tool';

export const handles: UserHandleModel[] = [
  {
    name: 'clone',
    pathData:
      'M60.3,18H27.5c-3,0-5.5,2.4-5.5,5.5v38.2h5.5V23.5h32.7V18z M68.5,28.9h-30c-3, 0-5.5,2.4-5.5,5.5v38.2c0,3,2.4,5.5,5.5,5.5h30c3,0,5.5-2.4,5.5-5.5V34.4C73.9,31.4,71.5,28.9,68.5,28.9z M68.5,72.5h-30V34.4h30V72.5z',
    visible: true,
    offset: 0,
    side: 'Bottom',
    pathColor: 'white',
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
];

export const getTool = (diagram: Diagram, action: string): ToolBase => {
  let tool: ToolBase;
  if (action === 'clone') {
    tool = new CloneTool(diagram);
  }
  return tool;
};
