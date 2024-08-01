import {
  MoveTool,
  MouseEventArgs,
  cloneObject,
  NodeModel,
  ConnectorModel,
  randomId,
  Diagram,
  IElement,
} from '@syncfusion/ej2-react-diagrams';

export class CloneTool extends MoveTool {
  diagram: Diagram;
  constructor(diagram: Diagram) {
    super(diagram.commandHandler);
    this.diagram = diagram;
  }

  public mouseDown(args: MouseEventArgs): void {
    let newObject: any;
    if (this.diagram.selectedItems.nodes.length > 0) {
      newObject = cloneObject(this.diagram.selectedItems.nodes[0]) as NodeModel;
    } else {
      newObject = cloneObject(
        this.diagram.selectedItems.connectors[0]
      ) as ConnectorModel;
    }
    newObject.id += randomId();
    this.diagram.paste([newObject]);
    args.source = this.diagram.nodes[this.diagram.nodes.length - 1] as IElement;
    args.sourceWrapper = args.source.wrapper;
    super.mouseDown(args);
    this.inAction = true;
  }
}
