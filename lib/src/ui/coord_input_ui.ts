import { GobanSize } from "../components/config";
import StoneMarker from "../components/stone_marker";

export default class CoordInputUi {
  private gobanSize: GobanSize = GobanSize.full19x19;
  private coordinates: string = "";
  private coordInput: HTMLInputElement = document.createElement(
    "input"
  ) as HTMLInputElement;
  private coordInputDiv: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;
  private stoneMarker: StoneMarker = new StoneMarker();

  constructor() {
    this.style();
    this.builtInValidation();
    this.coordInput.onchange = this.onChange;
    
    const rightColDiv: HTMLDivElement = document.querySelector(
      "div.right-col"
    ) as HTMLDivElement;

    rightColDiv.append(this.coordInputDiv);
  }

  changeGobanSize = (gobanSize: GobanSize): void => {
    this.gobanSize = gobanSize;
  };

  private style = (): void => {
    this.coordInput.id = "coordinates";
    this.coordInput.type = "text";
    this.coordInput.style.zIndex = "100";
    this.coordInput.draggable = true;
    this.coordInput.placeholder = "Coordinates";
    this.coordInput.size = this.coordInput.placeholder.length - 2;
    this.coordInput.style.position = "absolute";
    this.coordInput.style.bottom = "0";
    this.coordInput.style.border = "1px solid green";
    this.coordInput.style.padding = "7.5px";
    this.coordInput.style.paddingLeft = "10px";
    this.coordInput.style.backgroundColor = "white";
    this.coordInput.style.bottom = "10px";
  };

  private builtInValidation = (): void => {
    this.coordInput.minLength = 2;
    this.coordInput.maxLength = 3;
    this.coordInput.pattern = "[A-T|a-t][0-1]?[0-9]";  
  };

  toggle = (): void => {
    if (document.activeElement == this.coordInput) {
      this.coordInput.blur();
      this.coordInputDiv.removeChild(this.coordInput);
    } else {
      this.coordInputDiv.append(this.coordInput);
      // Erase any input
      this.coordInput.value = "";
      this.coordInput.focus();
    }
  };

  // Added for 'Escape' key to work
  disable = (): void => {
    if (document.activeElement == this.coordInput) {
      this.coordInput.blur();
      this.coordInputDiv.removeChild(this.coordInput);
    }
  }

  get isFocused(): boolean {
    return document.activeElement == this.coordInput;
  }

  private onChange = (_: Event): any => {
    if (this.coordInput.validity.patternMismatch) {
      this.coordInput.setCustomValidity(
        `A coordinate is composed by 
         a letter from A to T (upper or lowercase) 
         and a number from 1 to 19.`
      );
    } else {
      this.coordInput.setCustomValidity("");
      this.coordinates = this.coordInput.value.toLowerCase();
      this.stoneMarker = StoneMarker.fromCoordinates(
        this.coordinates,
        this.ratio,
        this.gobanSize
      );
      this.click();
      this.coordInput.value = "";
    }
  };

  // This is basically a repetition of what's inside the `StoneMarkerUi`, but I
  // will not do anything about it for now because it might make things more
  // unreadable actually.
  private get gameCanvas(): HTMLCanvasElement {
    const gameCanvasQuery: string = "div.Goban > div > canvas#board-canvas";
    return document.querySelector(gameCanvasQuery) as HTMLCanvasElement;
  }

  private get ratio(): number {
    return parseInt(this.gameCanvas.style.width) / 504;
  }

  private click = (): void => {
    const clickEvent: MouseEvent = document.createEvent("MouseEvent");
    const topOffset: number = this.gameCanvas.getBoundingClientRect().top;
    const leftOffset: number = this.gameCanvas.getBoundingClientRect().left;

    clickEvent.initMouseEvent(
      "click",
      true,
      true,
      window,
      0,
      0,
      0,
      this.stoneMarker.x + leftOffset,
      this.stoneMarker.y + topOffset,
      false,
      false,
      false,
      false,
      0,
      null
    );

    this.gameCanvas.dispatchEvent(clickEvent);
  };
}
