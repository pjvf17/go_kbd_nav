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
    shortcuts["moveup"] = "h";
    shortcuts["moveleft"] = "e";
    shortcuts["movedown"] = "d";
    shortcuts["moveright"] = "u";
    shortcuts["click"] = "s";
    shortcuts["pass"] = "ctrl+[";
    shortcuts["cycle"] = "ctrl+,";
    shortcuts["input"] = "n";
    shortcuts["submit"] = "j";
    await Browser.storage.sync.set({ shortcuts });
  }
};

defaults();

export const reset = async () => {
  await Browser.storage.sync.clear();
  await defaults();
}

