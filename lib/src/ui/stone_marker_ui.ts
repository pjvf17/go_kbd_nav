import { GobanSize } from "../components/config";
import StoneMarker from "../components/stone_marker";
// https://stackoverflow.com/questions/44391448/electron-require-is-not-defined

export enum Direction {
  right,
  down,
  left,
  up,
}

export default class StoneMarkerUi {
  static readonly shadowCanvasQuery: string =
    "div.Goban > div > canvas#shadow-canvas";
  private static readonly defaultCanvasSize: number = 465;

  private gobanSize: GobanSize = GobanSize.full19x19;
  private stoneMarker: StoneMarker = new StoneMarker();
  private stoneMarkerCanvas: HTMLCanvasElement = document.createElement(
    "canvas",
  ) as HTMLCanvasElement;
  private _canvasOn: boolean = false;

  get canvasOn(): boolean {
    return this._canvasOn;
  }

  private get stoneRatio(): number {
    return this.stoneMarkerCanvas.width / StoneMarkerUi.defaultCanvasSize;
  }

  toggleCanvas = (): void => {
    if (!this._canvasOn) {
      this.configureStoneMarkerCanvas();
      this.appendStoneMarkerCanvas();
      this.configureStoneMarker();
    } else if (this._canvasOn) {
      this.removeStoneMarkerCanvas();
    }
    this._canvasOn = !this._canvasOn;
    this.draw();
    this.drawInCorners();
  };

  private configureStoneMarker = (): void => {
    this.stoneMarker = StoneMarker.changeRatio(this.stoneRatio, this.gobanSize);
  };

  cycleGobanSize = (gobanSize: GobanSize): void => {
    this.toggleCanvas();
    this.gobanSize = gobanSize;
    this.toggleCanvas();
  };

  private removeStoneMarkerCanvas = (): void =>
    document.getElementById("stone-marker")?.remove();

  private configureStoneMarkerCanvas = (): void => {
    let width = document.querySelector("body")?.clientWidth as number;
    let height = document.querySelector("body")?.clientHeight as number;

    this.stoneMarkerCanvas.id = "stone-marker";
    this.stoneMarkerCanvas.style.zIndex = "21";
    this.stoneMarkerCanvas.style.position = "absolute";
    // this.stoneMarkerCanvas.style.borderBottom = "red solid";
    this.stoneMarkerCanvas.width = width;
    this.stoneMarkerCanvas.height = height;
  };

  private appendStoneMarkerCanvas = (): void => {
    let body = document.querySelector("body") as HTMLBodyElement;
    body.append(this.stoneMarkerCanvas);
  };

  private clear = (): void =>
    this.stoneMarkerCanvas
      .getContext("2d")
      ?.clearRect(
        0,
        0,
        this.stoneMarkerCanvas.width,
        this.stoneMarkerCanvas.height,
      );

  move = (direction: Direction): void => {
    this.clear();
    this.moveSwitch(direction);
    this.draw();
  };

  private moveSwitch = (direction: Direction): void => {
    switch (direction) {
      case Direction.right:
        this.stoneMarker = this.stoneMarker.moveRight();
        break;
      case Direction.down:
        this.stoneMarker = this.stoneMarker.moveDown();
        break;
      case Direction.left:
        this.stoneMarker = this.stoneMarker.moveLeft();
        break;
      case Direction.up:
        this.stoneMarker = this.stoneMarker.moveUp();
        break;
    }
  };

  private draw = (): void => {
    const context: CanvasRenderingContext2D = this.stoneMarkerCanvas.getContext(
      "2d",
    )!;

    console.log(context);
    console.log(this.stoneMarker);
    context.beginPath();
    context.arc(
      this.stoneMarker.x,
      this.stoneMarker.y,
      this.stoneMarker.radius,
      0,
      2 * Math.PI,
    );
    context.lineWidth = 3;
    context.strokeStyle = "green";
    context.stroke();
    // ipcRenderer.invoke('getBounds').then((result) => {
    //   console.log(result)
    // })
  };

  private drawInCorners = (): void => {
    // Go to bottom left
    for (let i = 1; i <= 19; i++) {
      this.stoneMarker = this.stoneMarker.moveDown();
    }
    this.draw();
    for (let i = 1; i <= 19; i++) {
      this.stoneMarker = this.stoneMarker.moveRight();
    }
    this.draw();
    for (let i = 1; i <= 19; i++) {
      this.stoneMarker = this.stoneMarker.moveUp();
    }
    this.draw();
  };

  click = (): void => {
    const clickEvent: MouseEvent = document.createEvent("MouseEvent");
    const topOffset: number = this.stoneMarkerCanvas.getBoundingClientRect()
      .top;
    const leftOffset: number = this.stoneMarkerCanvas.getBoundingClientRect()
      .left;
    // clickEvent.initMouseEvent(
    //   "click",
    //   true,
    //   true,
    //   window,
    //   0,
    //   0,
    //   0,
    //   this.stoneMarker.x + leftOffset,
    //   this.stoneMarker.y + topOffset,
    //   false,
    //   false,
    //   false,
    //   false,
    //   0,
    //   null,
    // );

    window.api.click("click", {
      x: this.stoneMarker.x + leftOffset,
      y: this.stoneMarker.y + topOffset,
    });

    const gameCanvasQuery: string = "div.Goban > div > canvas#board-canvas";
    const gameCanvas: HTMLCanvasElement = document.querySelector(
      gameCanvasQuery,
    ) as HTMLCanvasElement;

    gameCanvas?.dispatchEvent(clickEvent);
  };
}
