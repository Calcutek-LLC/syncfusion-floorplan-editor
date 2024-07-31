import {
  DiagramComponent,
  HierarchicalTree,
  MindMap,
  RadialTree,
  ComplexHierarchicalTree,
  DataBinding,
  Snapping,
  PrintAndExport,
  BpmnDiagrams,
  SymmetricLayout,
  ConnectorBridging,
  UndoRedo,
  LayoutAnimation,
  DiagramContextMenu,
  ConnectorEditing,
  Ej1Serialization,
  Inject,
} from '@syncfusion/ej2-react-diagrams';

const ProjectDrawing = () => {
  return (
    <DiagramComponent id="diagram" width={1000} height={500}>
      <Inject
        services={[
          HierarchicalTree,
          MindMap,
          RadialTree,
          ComplexHierarchicalTree,
          DataBinding,
          Snapping,
          PrintAndExport,
          BpmnDiagrams,
          SymmetricLayout,
          ConnectorBridging,
          UndoRedo,
          LayoutAnimation,
          DiagramContextMenu,
          ConnectorEditing,
          Ej1Serialization,
        ]}
      />
    </DiagramComponent>
  );
};

export default ProjectDrawing;
