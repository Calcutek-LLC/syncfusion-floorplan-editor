# Introduction

This is a proof of concept for building the design canvas for the floorplan editor using Syncfusion React Diagram component. The floorplan editor is a web application that allows users to create and edit floorplans. It provides tools to draw the layout on the html canvas and save the layout to the database. The following sections provide the list of features to be supported in the floorplan editor.

## Features

### Design Canvas

The design canvas is the main area where users can draw the layout of the floorplan. The design canvas provides the following features:

1. Drag and Drop: Users can drag and drop the objects on the design canvas to create the layout.
2. Resize: Users can resize the objects on the design canvas to adjust the size of the layout.
3. Zoom In/Out: Users can zoom in and out the design canvas to view the layout in detail.
4. Freehand Drawing: Users can draw freehand lines on the design canvas to create custom shapes.
5. Grid Snapping: Users can enable grid snapping to align the objects on the design canvas.
6. Rulers: Users can view the rulers on the design canvas to measure the size of the shapes and measure the distance between the shapes.
7. Layers: Users can create multiple layers on the design canvas to organize the layout. The layers can be hidden or shown based on the user's preference.
8. Undo/Redo: Users can undo and redo the actions performed on the design canvas.
9. Boundary Detection: Users can enable boundary detection to prevent the objects from going outside the design canvas.
10. Copy/Paste: Users can copy and paste the objects on the design canvas.
11. View Object Properties: Users can view the properties of the objects on the design canvas. The properties include the name, size, position, and other custom properties.
12. Styling Options: The design canvas should support shapes with different styles like fill color, stroke color, stroke width, line style, line width, and opacity.
13. Text Annotation: Users can add text annotations to the shapes on the design canvas.
14. Image Support: Users can add background images to the design canvas. This could be a floorplan image or any other image that the user wants to use as a reference.
15. Multi-Selection: Users can select multiple objects on the design canvas and perform operations like move, resize, delete, etc.
16. Parent-Child Relationship: Users can create parent-child relationships between the objects on the design canvas. This allows users to group the objects and move them together.
17. Drop Hint: Users can see the drop hint while dragging the objects on the design canvas. The drop hint indicates the position where the element will be dropped.
18. Drag Info: Users can see the drag info while dragging the objects on the design canvas. The drag info provides information about the element being dragged.
19. Highlight Error: There will be some validation rules for the objects on the design canvas. If the user violates the validation rules, the objects should be highlighted with an error color.

### Object Library

The object library is a sidebar that contains a list of objects that users can drag and drop on the design canvas. The element library provides the following features:

1. Tree View: The objects in the object library are organized in a tree view. Users can expand and collapse the tree nodes to view the objects.
2. Drag and Drop: Users can drag and drop the objects on the leaf nodes of the tree view to the design canvas.
3. Custom Properties: The objects have custom properties including the style properties like fill color, stroke color, stroke width, line style, line width, and opacity. The style properties must be used to style the objects on the design canvas.

### Properties Panel

The properties panel is a sidebar that displays the properties of the selected element on the design canvas. The properties panel provides the following features:

1. Display Properties: The properties panel displays the properties of the selected element on the design canvas. The properties include the name, size, position, and other custom properties.
2. Edit Properties: Users can edit the properties of the selected element on the design canvas. The changes made in the properties panel should reflect on the design canvas.
