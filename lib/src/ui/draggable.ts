import StoneMarkerUi from "./stone_marker_ui";

export default class Draggable extends StoneMarkerUi {
  private draggableCanvas: HTMLCanvasElement = document.createElement("canvas");
  private target: HTMLElement | null = null;
  private coords = {
    x: 0,
    y: 0,
  };
  constructor() {
    super();
    // As you drag, update the bottom and right
    const dragFunction = (e: MouseEvent) => {
      console.log(e);
      console.log(this.draggableCanvas);
      console.log(this.coords);
      this.draggableCanvas.style.width = (
        e.x - this.coords.x
      ) + "px";
      this.draggableCanvas.style.height = (
        e.y - this.coords.y
      ) + "px";
    };

    // Create canvas at coords of click
    window.addEventListener("mousedown", (e) => {
      this.draggableCanvas.style.top = e.y + "px";
      this.draggableCanvas.style.left = e.x + "px";
      this.coords.x = e.x;
      this.coords.y = e.y;

      this.draggableCanvas.style.position = "absolute";
      this.draggableCanvas.style.height = 0 + "px";
      this.draggableCanvas.style.width = 0 + "px";
      this.draggableCanvas.style.borderStyle = "dotted";
      this.draggableCanvas.style.borderColor = "green";

      this.target = e.target as HTMLElement;
      this.target.append(this.draggableCanvas);

      window.addEventListener("mousemove", dragFunction);
    });
    // Get rid of drag function
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", dragFunction);
    });
  }
}
