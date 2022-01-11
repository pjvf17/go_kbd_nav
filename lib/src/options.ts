import Browser from "webextension-polyfill";
import { reset } from "./default";

var Mousetrap = require("mousetrap-record")(require("mousetrap"));

const recordSequence = async (
  elem: HTMLInputElement,
  shortcuts: { [index: string]: string },
) => {
  await Mousetrap.record(async function (sequence: string[]) {
    // sequence is an array like ['ctrl+k', 'c']
    elem.value = sequence.join(" ");
    shortcuts[elem.id] = sequence.join(" ");
    await Browser.storage.sync.set({ shortcuts });
    checkDuplicates(shortcuts);
  });
};

const checkDuplicates = (shortcuts: { [index: string]: string }) => {
  let seen: { [index: string]: string[] } = {};
  for (let inputID in shortcuts) {
    // Reset all input colors
    let input = document.getElementById(inputID) as HTMLInputElement;
    input.style.backgroundColor = "";
    if (seen[shortcuts[inputID]] !== undefined) {
      seen[shortcuts[inputID]].push(inputID);
    } else {
      seen[shortcuts[inputID]] = [inputID];
    }
  }
  // Loop through shortcuts, if the amount of elements with the same number
  // Of shortcuts is > 1, turn them red
  for (let e in seen) {
    if (seen[e].length > 1) {
      seen[e].forEach((el) => {
        let input = document.getElementById(el) as HTMLInputElement;
        input.style.backgroundColor = "red";
      });
    }
  }
};

// const consol: HTMLParagraphElement = document.getElementById(
//   "consol",
// ) as HTMLParagraphElement;

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
      () => recordSequence(input, shortcuts),
    );
  });
  checkDuplicates(shortcuts);
  let resetButton = document.querySelector("#reset");
  // If reset button is pressed, call reset and then run main again to refresh keys
  resetButton?.addEventListener("click", () =>
    reset().then(() => {
      // TODO: Check if still needed
      inputs.forEach((input) => input.style.backgroundColor = "");
      main();
    }));
};

document.addEventListener("DOMContentLoaded", main);
