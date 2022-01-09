import Browser from "webextension-polyfill";
import { reset } from "./default";

var Mousetrap = require("mousetrap-record")(require("mousetrap"));

const recordSequence = (
  e: MouseEvent,
  elem: HTMLInputElement,
  shortcuts: { [index: string]: string },
) => {
  console.log("checking");
  console.log(e);
  Mousetrap.record(async function (sequence: string[]) {
    // sequence is an array like ['ctrl+k', 'c']
    elem.value = sequence.join(" ");
    shortcuts[elem.id] = sequence.join(" ");
    await Browser.storage.sync.set({ shortcuts });
  });
};

const main = async () => {
  let inputs = document.querySelectorAll("input");
  let shortcuts = await Browser.storage.sync.get("shortcuts");
  shortcuts = shortcuts["shortcuts"];
  inputs.forEach(async (input) => {
    input.value = shortcuts[input.id];
    let button = document.querySelector(
      "#" + input.id + "button",
    ) as HTMLButtonElement;
    button?.addEventListener(
      "click",
      (e) => recordSequence(e, input, shortcuts),
    );
  });
  let resetButton = document.querySelector("#reset");
  // If reset button is pressed, call reset and then run main again to refresh keys
  resetButton?.addEventListener("click", () => reset().then(() => main()));
};

document.addEventListener("DOMContentLoaded", main);
