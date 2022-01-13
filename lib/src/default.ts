import Browser from "webextension-polyfill";

const defaults = async () => {
  let shortcuts = await Browser.storage.sync.get("shortcuts");
  // If shortcuts haven't been assigned yet (first time using this extension)
  if (shortcuts["shortcuts"] === undefined) {
    // Default keybinds
    shortcuts["globalswitch"] = "ctrl+\\";
    shortcuts["chat"] = "ctrl+m";
    shortcuts["overlay"] = "ctrl+b";
    shortcuts["arrowkeys"] = "ctrl+]";
    shortcuts["moveup"] = "w";
    shortcuts["moveleft"] = "a";
    shortcuts["movedown"] = "s";
    shortcuts["moveright"] = "d";
    shortcuts["click"] = "enter";
    shortcuts["pass"] = "ctrl+[";
    shortcuts["cycle"] = "ctrl+,";
    shortcuts["input"] = "ctrl+.";
    shortcuts["submit"] = "j";
    shortcuts["globalsubmit"] = "shift+e";
    await Browser.storage.sync.set({ shortcuts });
  }
};

defaults();

export const reset = async () => {
  await Browser.storage.sync.clear();
  await defaults();
}

