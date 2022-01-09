import { Direction } from "../ui/stone_marker_ui";
import Ui from "../ui/ui";
import Config from "./config";
import CoordInputUi from "../ui/coord_input_ui";
import Browser from "webextension-polyfill";
import Mousetrap from "mousetrap";
import "mousetrap/plugins/global-bind/mousetrap-global-bind.js";


export default class Kbd {
  private kbdEvt: KeyboardEvent = new KeyboardEvent("keypress");
  private config: Config = Config.default();
  private ui: Ui = new Ui();

  constructor() {
    // Turn on logo
    this.ui.logo.toggle();
    // Always bind escape
    Mousetrap.bindGlobal("esc", this.escape);
    // Loop through shortcuts and bind each one to it's appropriate action
    Browser.storage.sync.get("shortcuts").then((res) => {
      console.log(res["shortcuts"]);
      for (let shortcut in res["shortcuts"]) {
        switch (shortcut) {
          case "globalswitch": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.globalToggle);
            break;
          }
          case "chat": {
            // Global so you can exit with same keybind
            Mousetrap.bindGlobal(res["shortcuts"][shortcut], this.toggleChatInput);
            break;
          }
          case "overlay": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.toggleCanvas);
            break;
          }
          case "arrowkeys": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.toggleArrowKeys);
            break;
          }
          case "moveup": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.moveUp);
            break;
          }
          case "moveleft": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.moveLeft);
            break;
          }
          case "movedown": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.moveDown);
            break;
          }
          case "moveright": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.moveRight);
            break;
          }
          case "click": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.play);
            break;
          }
          case "pass": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.pass);
            break;
          }
          case "cycle": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.cycleGobanSize);
            break;
          }
          case "input": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.toggleCoordInput);
            break;
          }
          case "submit": {
            Mousetrap.bind(res["shortcuts"][shortcut], this.confirm);
            break;
          }
        }
      }
    });
  }

  private globalToggle = (): void => {
    this.config = this.config.toggleGlobalSwitch();
    this.ui.stoneMarkerUi?.toggleCanvas();
    this.ui.logo.toggle();
  };

  private toggleCanvas = (): void => {
    this.ui.stoneMarkerUi?.toggleCanvas();
  };

  private toggleChatInput = (): void => {
    this.ui.chat.toggleChatInput();
  };

  private pass = (): void => {
    this.ui.passButton.click();
  };

  // private toggleAiReview = (): void => {
  //   this.ui.aiReview.toggle();
  // };

  private toggleCoordInput = (): void => {
    if (this.ui.coordInputUi === null) {
      this.ui.coordInputUi = new CoordInputUi();
    }
    this.ui.coordInputUi?.toggle();
    this.kbdEvt.preventDefault();
  };

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

  // private keySwitch = (): void => {
  //   // h: up
  //   // t: down
  //   // u: right
  //   // e: left
  //   // s: place
  //   // n: coord input field
  //   switch (this.kbdEvt.key) {
  //     case "b":
  //       this.toggleCanvas();
  //       break;
  //     case "m":
  //       this.toggleChatInput();
  //       break;
  //     case "[":
  //       this.pass();
  //       break;
  //     case "]":
  //       this.toggleArrowKeys();
  //       break;
  //     case ";":
  //       this.toggleAiReview();
  //       break;
  //     case "n":
  //       if(this.anInputIsFocused) {
  //         this.toggleCoordInput();
  //       }
  //       break;
  //     case "t":
  //       // Dvorak
  //       this.moveUp();
  //       this.cycleGobanSize();
  //       break;
  //     case "u":
  //       this.moveRight();
  //       break;
  //     case "ArrowRight":
  //       if (this.config.arrowKeysOn) this.moveRight();
  //       break;
  //     case "h":
  //       this.moveDown();
  //       break;
  //     case "ArrowDown":
  //       if (this.config.arrowKeysOn) this.moveDown();
  //       break;
  //     case "e":
  //       this.moveLeft();
  //       break;
  //     case "ArrowLeft":
  //       if (this.config.arrowKeysOn) this.moveLeft();
  //       break;
  //     case "ArrowUp":
  //       if (this.config.arrowKeysOn) this.moveUp();
  //       break;
  //     case "Enter":
  //       this.play();
  //       break;
  //     case "s":
  //       this.play();
  //       break;
  //     case "E":
  //       this.confirm();
  //       break;
  //     case "j":
  //       if(!this.ui.coordInputUi?.isFocused) {
  //         this.confirm();
  //       }
  //       break;
  //     case "Escape":
  //       this.ui.coordInputUi?.disable();
  //       break;
  //   }
  // };

  private escape = ():void => {
    if (this.ui.chat.isFocused) {
      this.toggleChatInput();
    }
    this.ui.coordInputUi?.disable();
  };
  private confirm = (): void => {
    this.ui.confirmMove.click();
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
