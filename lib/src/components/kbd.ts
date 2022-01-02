import { Direction } from "../ui/stone_marker_ui";
import Ui from "../ui/ui";
import Config from "./config";
import CoordInputUi from "../ui/coord_input_ui";

export default class Kbd {
  private kbdEvt: KeyboardEvent = new KeyboardEvent("keypress");
  private config: Config = Config.default();
  private ui: Ui = new Ui();

  constructor() {
    this.ui.logo.toggle();
    document.onkeydown = this.onKeydown;
  }

  private onKeydown = (evt: KeyboardEvent) => {
    this.kbdEvt = evt;
    this.globalSwitch();
  };

  private globalSwitch = (): void => {
    switch (this.kbdEvt.key) {
      case "\\":
        this.globalToggle();
        break;
      default:
        if (this.config.globalSwitch) this.keySwitch();
    }
  };

  private globalToggle = (): void => {
    if (this.kbdEvt.ctrlKey) {
      this.config = this.config.toggleGlobalSwitch();
      this.ui.stoneMarkerUi?.toggleCanvas();
      this.ui.logo.toggle();
    }
  };

  private toggleCanvas = (): void => {
    if (this.kbdEvt.ctrlKey) this.ui.stoneMarkerUi?.toggleCanvas();
  };

  private toggleChatInput = (): void => {
    if (this.kbdEvt.ctrlKey) this.ui.chat.toggleChatInput();
  };

  private pass = (): void => {
    if (this.kbdEvt.ctrlKey) this.ui.passButton.click();
  };

  private toggleAiReview = (): void => {
    if (this.kbdEvt.ctrlKey) this.ui.aiReview.toggle();
  };

  private toggleCoordInput = (): void => {
    if (this.ui.coordInputUi === null) {
      this.ui.coordInputUi = new CoordInputUi();
    }
    this.ui.coordInputUi?.toggle();
    this.kbdEvt.preventDefault();
  }

  private toggleArrowKeys = (): void => {
    this.config = this.config.toggleArrowKeys();
  };

  private cycleGobanSize = (): void => {
    if (this.kbdEvt.ctrlKey) {
      this.config = this.config.cycleSize();
      this.ui.coordInputUi?.changeGobanSize(this.config.gobanSize);
      this.ui.stoneMarkerUi?.cycleGobanSize(this.config.gobanSize);
    }
  };

  private keySwitch = (): void => {
    // h: up
    // t: down
    // u: right
    // e: left
    // n: place
    // s: coord input field
    switch (this.kbdEvt.key) {
      case "b":
        this.toggleCanvas();
        break;
      case "m":
        this.toggleChatInput();
        break;
      case "[":
        this.pass();
        break;
      case "]":
        this.toggleArrowKeys();
        break;
      case ";":
        this.toggleAiReview();
        break;
      case "n":
        if(this.anInputIsFocused) {
          this.toggleCoordInput();
        }
        break;
      case "t":
        // Dvorak
        this.moveUp();
        this.cycleGobanSize();
        break;
      case "u":
        this.moveRight();
        break;
      case "ArrowRight":
        if (this.config.arrowKeysOn) this.moveRight();
        break;
      case "h":
        this.moveDown();
        break;
      case "ArrowDown":
        if (this.config.arrowKeysOn) this.moveDown();
        break;
      case "e":
        this.moveLeft();
        break;
      case "ArrowLeft":
        if (this.config.arrowKeysOn) this.moveLeft();
        break;
      case "ArrowUp":
        if (this.config.arrowKeysOn) this.moveUp();
        break;
      case "Enter":
        this.play();
        break;
      case "s":
        this.play();
        break;
      case "E":
        this.confirm();
        break;
      case "j": 
        if(!this.ui.coordInputUi?.isFocused) {
          this.confirm();
        }
        break;
      case "Escape":
        this.ui.coordInputUi?.disable();
        break;
    }
  };

  private confirm = (): void => {
    this.ui.confirmMove.click()
    this.ui.coordInputUi?.disable();
  };

  private get anInputIsFocused(): boolean {
    return !this.ui.chat.isFocused && !this.ui.coordInputUi?.isFocused;
  }

  private moveRight = (): void => {
    if (this.anInputIsFocused) this.ui.stoneMarkerUi?.move(Direction.right);
  };

  private moveDown = (): void => {
    if (this.anInputIsFocused) this.ui.stoneMarkerUi?.move(Direction.down);
  };

  private moveLeft = (): void => {
    if (this.anInputIsFocused) {
      // Disabled this because I couldn't find a reason for it, and it was somehow causing me to pass whenever moving left in a review
      // this.skipAnalysis();
      this.ui.stoneMarkerUi?.move(Direction.left);
    }
  };

  // private skipAnalysis = (): void => {
  //   const backToGameButtonQuery: string =
  //     "div.analyze-mode-buttons > span > button";
  //   const backToGameButton: HTMLButtonElement = document.querySelector(
  //     backToGameButtonQuery
  //   ) as HTMLButtonElement;
  //   backToGameButton?.click();
  // };

  private moveUp = (): void => {
    if (this.anInputIsFocused) this.ui.stoneMarkerUi?.move(Direction.up);
  };

  private play = (): void => {
    if (this.anInputIsFocused) this.ui.stoneMarkerUi?.click();
  };
}
