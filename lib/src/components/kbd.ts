import { Direction } from "../ui/stone_marker_ui";
import Ui from "../ui/ui";
import Config from "./config";
import CoordInputUi from "../ui/coord_input_ui";
import Mousetrap from "mousetrap";
import "mousetrap/plugins/global-bind/mousetrap-global-bind.js";
import shortcuts from "../default"

export default class Kbd {
  private kbdEvt: KeyboardEvent = new KeyboardEvent("keypress");
  private config: Config = Config.default();
  private ui: Ui = new Ui();

  constructor() {
    // Turn on logo
    // this.ui.logo.toggle();
    this.mousetrapSetup();
  }

  private mousetrapSetup = (): void => {
    // Always bind escape
    Mousetrap.bindGlobal("esc", this.escape);
    // Loop through shortcuts and bind each one to it's appropriate action

    for (let shortcut in shortcuts) {
      switch (shortcut) {
        case "globalswitch": {
          Mousetrap.bind(shortcuts[shortcut], this.globalToggle);
          break;
        }
        case "chat": {
          // This is global so you can exit chat with same keybind
          Mousetrap.bindGlobal(
            shortcuts[shortcut],
            this.toggleChatInput,
          );
          break;
        }
        case "overlay": {
          Mousetrap.bind(shortcuts[shortcut], this.toggleCanvas);
          break;
        }
        case "arrowkeys": {
          Mousetrap.bind(shortcuts[shortcut], this.toggleArrowKeys);
          break;
        }
        case "moveup": {
          Mousetrap.bind(shortcuts[shortcut], this.moveUp);
          break;
        }
        case "moveleft": {
          Mousetrap.bind(shortcuts[shortcut], this.moveLeft);
          break;
        }
        case "movedown": {
          Mousetrap.bind(shortcuts[shortcut], this.moveDown);
          break;
        }
        case "moveright": {
          Mousetrap.bind(shortcuts[shortcut], this.moveRight);
          break;
        }
        case "click": {
          Mousetrap.bind(shortcuts[shortcut], this.play);
          break;
        }
        case "globalsubmit": {
          Mousetrap.bindGlobal(shortcuts[shortcut], this.submit);
          break;
        }
        case "pass": {
          Mousetrap.bind(shortcuts[shortcut], this.pass);
          break;
        }
        case "cycle": {
          Mousetrap.bind(shortcuts[shortcut], this.cycleGobanSize);
          break;
        }
        case "input": {
          Mousetrap.bind(shortcuts[shortcut], this.toggleCoordInput);
          break;
        }
        case "submit": {
          Mousetrap.bind(shortcuts[shortcut], this.submit);
          break;
        }
      }
    }
  };

  private globalToggle = (): void => {
    this.config = this.config.toggleGlobalSwitch();
    this.ui.stoneMarkerUi?.toggleCanvas();
    this.ui.logo.toggle();
  };

  private toggleCanvas = (): void => {
    this.ui.stoneMarkerUi?.toggleCanvas();
  };

  private toggleChatInput = (): void => {
    this.ui.coordInputUi?.disable();
    this.ui.chat.toggleChatInput();
  };

  private pass = (): void => {
    this.ui.passButton.click();
  };

  private toggleCoordInput = (): void => {
    if (this.ui.coordInputUi === null) {
      this.ui.coordInputUi = new CoordInputUi();
    }
    this.ui.coordInputUi?.toggle();
    this.kbdEvt.preventDefault();
  };

  private toggleArrowKeys = (): void => {
    this.config = this.config.toggleArrowKeys();
    if (this.config.arrowKeysOn) {
      Mousetrap.bind("up", () => {
        this.skipAnalysis();
        this.moveUp();
      });
      Mousetrap.bind("left", () => {
        this.skipAnalysis();
        this.moveLeft();
      });
      Mousetrap.bind("down", () => {
        this.skipAnalysis();
        this.moveDown();
      });
      Mousetrap.bind("right", () => {
        this.skipAnalysis();
        this.moveRight();
      });
    } else {
      Mousetrap.unbind("up");
      Mousetrap.unbind("left");
      Mousetrap.unbind("down");
      Mousetrap.unbind("right");
    }
  };

  private cycleGobanSize = (): void => {
    if (this.kbdEvt.ctrlKey) {
      this.config = this.config.cycleSize();
      this.ui.coordInputUi?.changeGobanSize(this.config.gobanSize);
      this.ui.stoneMarkerUi?.cycleGobanSize(this.config.gobanSize);
    }
  };

  private escape = (): void => {
    if (this.ui.chat.isFocused) {
      this.toggleChatInput();
    }
    this.ui.coordInputUi?.disable();
  };

  private submit = (): void => {
    this.ui.confirmMove.click();
    this.ui.coordInputUi?.disable();
  };

  private moveRight = (): void => {
    this.ui.stoneMarkerUi?.move(Direction.right);
  };

  private moveDown = (): void => {
    this.ui.stoneMarkerUi?.move(Direction.down);
  };

  private moveLeft = (): void => {
    this.ui.stoneMarkerUi?.move(Direction.left);
  };

  private skipAnalysis = (): void => {
    const backToGameButtonQuery: string =
      "div.analyze-mode-buttons > span > button";
    const backToGameButton: HTMLButtonElement = document.querySelector(
      backToGameButtonQuery,
    ) as HTMLButtonElement;
    backToGameButton?.click();
  };

  private moveUp = (): void => {
    this.ui.stoneMarkerUi?.move(Direction.up);
  };

  private play = (): void => {
    this.ui.stoneMarkerUi?.click();
  };
}
