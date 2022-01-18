// import Browser from "webextension-polyfill";

const shortcuts: { [index: string]: string } = {};
// Default keybinds
shortcuts["globalswitch"] = "ctrl+\\";
shortcuts["chat"] = "ctrl+m";
shortcuts["overlay"] = "ctrl+b";
shortcuts["arrowkeys"] = "ctrl+]";
shortcuts["moveup"] = "t";
shortcuts["moveleft"] = "e";
shortcuts["movedown"] = "h";
shortcuts["moveright"] = "u";
shortcuts["click"] = "s";
shortcuts["pass"] = "ctrl+[";
shortcuts["cycle"] = "ctrl+,";
shortcuts["input"] = "ctrl+.";
shortcuts["submit"] = "j";
shortcuts["globalsubmit"] = "shift+e";

export default shortcuts;

// export const reset = async () => {
//   await Browser.storage.sync.clear();
//   await defaults();
// }
