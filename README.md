# Go Keyboard Navigation

<!-- <p align="center">
  <img src="assets/favicon.svg" height="250px">
</p> -->

<p align="center">
  <a href="https://github.com/pjvf17/go_kbd_nav/releases"><img src="https://img.shields.io/github/downloads/pjvf17/go_kbd_nav/total.svg" alt="Downloads" /></a>
</p>

This project is forked from and inspired by [ogs kbd nav]

At the time that I discovered that addon, I found it didn't work properly on firefox. I started by fixing that functionality, and have also added configurable keybinds. I hope to eventually expand functionality to other servers and websites. Much of the readme at this time is very similar to that extension, with a few specific changes for my version

- [1. What is this?](#1-what-is-this)
- [2. Why?](#2-why)
- [3. Table of Shortcuts](#3-table-of-shortcuts)
  - [3.1. Defaults](#31-defaults)
  - [3.2. Configuration](#32-configuration)
    - [3.2.1 Firefox](#321-firefox)
    - [3.2.2 Chrome](#322-chrome)
- [4. How to Install This Browser Extension](#4-how-to-install-this-browser-extension)
  - [4.1. From the Different Stores](#41-from-the-different-stores)
  - [4.2. From a Github Release](#42-from-a-github-release)
    - [4.2.1. Google Chrome](#421-google-chrome)
    - [4.2.2. Firefox](#422-firefox)
    - [4.2.3. Microsoft Edge](#423-microsoft-edge)
- [5. Other Resources](#5-other-resources)
- [6. For the Developer](#6-for-the-developer)
  - [6.1. How does this work?](#61-how-does-this-work)
  - [6.2. Compiling with TypeScript](#62-compiling-with-typescript)
  - [6.3. Compiling with Webpack](#63-compiling-with-webpack)
  - [6.4. Running Tests](#64-running-tests)
  - [6.5. The Complete Development Setup](#65-the-complete-development-setup)

## 1. What is this?

Keyboard &mdash; better &mdash; navigation for [OGS][ogs], the best online platform for playing the game of [Go][go]. Now, instead of only being able to play the ancient game online with your mouse, you can do it with your keyboard as well. Other handy shortcuts are also included.

[go]: https://en.wikipedia.org/wiki/Go_(game)
[ogs]: https://online-go.com/

## 2. Why?

Mostly, because I wanted to. But I also do believe that other players will benefit greatly from this, because:

- Using the keyboard where there are specialized keys for different actions will **diminish the likelihood of missclicks**.
- Even though it can be annoying to have to move the marker with across the whole board when there are drastic changes in plays' locations, on average, your playing speed will increase. And that means you're gonna have **less friction between the interface and your brain**, which will let you focus better on the game.

At first I didn't believe any of the benefits above, but, after trying it out for a week, I can clearly say it did help, it did improve the UI/UX.

## 3. Table of Shortcuts

> **This extension currently only works if you have *all* the coordinates turned on.**

> You might experience the extension not working when you transition to a game page. In that case, simply refresh the page and it will most likely work again.

If you don't want conflict with OGS' UI, prefer the WASD keys instead of the arrow keys. The arrow keys are disabled by default, so they won't bother you initially.

The extension has its logo right next to OGS' when active. At first, the extension will be enabled but its canvas overlay with the stone marker might not, use <kbd>Ctrl</kbd> + <kbd>b</kbd> to then enable the stone marker.

### 3.1. Defaults

| Shortcut                          | Action                                                          |
| --------------------------------- | --------------------------------------------------------------- |
| <kbd>Ctrl</kbd> + <kbd>\\</kbd>   | Global switch: enables or disables the whole extension          |
| <kbd>Ctrl</kbd> + <kbd>m</kbd>    | Toggle the chat input box on a game page                        |
| <kbd>Ctrl</kbd> + <kbd>b</kbd>    | Toggle the canvas overlay with the stone marker                 |
| <kbd>Ctrl</kbd> + <kbd>]</kbd>    | Toggle the arrow keys                                           |
| <kbd>w</kbd> or <kbd>&uarr;</kbd> | Move the stone marker up                                        |
| <kbd>a</kbd> or <kbd>&larr;</kbd> | Move the stone marker left<sup>1</sup>                          |
| <kbd>s</kbd> or <kbd>&darr;</kbd> | Move the stone marker down                                      |
| <kbd>d</kbd> or <kbd>&rarr;</kbd> | Move the stone marker right                                     |
| <kbd>Enter</kbd> or <kbd>f</kbd>  | Click on the stone marker's location                            |
| <kbd>Ctrl</kbd> + <kbd>[</kbd>    | Pass                                                            |
| <kbd>Ctrl</kbd> + <kbd>,</kbd>    | Cycle through the different board sizes<sup>2</sup>             |
| <kbd>Ctrl</kbd> +  <kbd>.</kbd>   | Toggle the coordinates input field<sup>3</sup>                  |
| <kbd>j</kbd>                      | Press the submit button<sup>4</sup>                             |
| <kbd>Shift</kbd> + <kbd>e</kbd>   | Press the submit button (even in coordinate input) <sup>4</sup> |

<sub>1: Using the arrow keys also activates analysis during the game, so I'm currently programmatically pressing the <kbd>Back to game</kbd> button in the background. This causes flashing on the right side of the screen</sub>
\
<sub>2: The extension has no way of identifying that you're on a smaller Goban size &mdash; only 19x19, 13x13 and 9x9 sizes are currently supported &mdash; so you will have to use this shortcut in order to manually achieve what you're looking for. And toggling to the right size is also necessary for the coordinates input field to work properly.</sub>
\
<sub>3: The coordinates should be of the form letter &mdash; lower or uppercase &mdash; and a number from 1 to 19. For example, both `c11` and `C11` are valid. Unless you're in a correspondence game, the stone will be placed immediately at the coordinates you enter</sub>
\
<sub>4: Typically used in correspondence games.</sub>

### 3.2. Configuration

#### 3.2.1 Firefox

1. Go to [about:addons](about:addons)
2. Scroll down to Go Keyboard Navigation and click on it
3. Click on preferences, follow instructions

#### 3.2.2 Chrome

1. Go to [chrome://extensions/][chrome_extensions]
2. Select Go Keyboard Navigation
3. Click on Extension options, follow instructions

## 4. How to Install This Browser Extension

You can either install it through the [Github releases][releases] or through the &mdash; future &mdash; published extensions on Google Chrome's, Microsoft Edge's and Firefox's browser extension stores.


[releases]: https://github.com/FanaroEngineering/ogs_kbd_nav/releases

### 4.1. From the Different Stores

<!-- 
Choose one of the links below:

| Browser Extension Store |
| ----------------------- |
| [Chrome][chrome]        |
| [Firefox][firefox]      |
| [Edge][edge]            |


[chrome]: https://chrome.google.com/webstore/detail/ogs-kbd-nav/blcjnnogmdhggfgdpploigilegjdopmp?hl=en&authuser=0
[edge]: https://microsoftedge.microsoft.com/addons/detail/ogs-kbd-nav/hghfjmadiodnkelleppombenchlcbjol
[firefox]: https://addons.mozilla.org/en-US/firefox/addon/ogs-kbd-nav/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search -->

Hope to get this extension on the stores soon

### 4.2. From a Github Release

1. Go to the [releases](https://github.com/pjvf17/go_kbd_nav/releases) page.
2. Download the latest release's ZIP folder.

#### 4.2.1. Google Chrome

1. Unzip the extension in a local folder.
2. Go to [chrome://extensions/][chrome_extensions]
3. Activate <kbd>Developer mode</kbd> on the upper-right corner.
4. Click on <kbd>Load unpacked</kbd> and choose the folder where you unzipped the extension.

[chrome_extensions]: chrome://extensions/

#### 4.2.2. Firefox

1. Go to [about:debugging][about_debugging]
2. Click on <kbd>This Firefox</kbd>.
3. Click on <kbd>Load Temporary Add-on...</kbd> and load the zip file directly.

[about_debugging]: about:debugging

#### 4.2.3. Microsoft Edge

1. Unzip the extension in a local folder.
2. Go to [edge://extensions][edge_extensions]
3. Activate <kbd>Developer mode</kbd> on the lower-left corner.
4. Click on <kbd>Load unpacked</kbd> and choose the folder where you unzipped the extension.

[edge_extensions]: edge://extensions/

## 5. Other Resources

Two other examples of keyboard navigation browser extensions:

- [Surfingkeys] is another web browser (including Google Chrome, Chromium based browsers, Firefox, Safari) extension that provides keyboard-based navigation and control of the web in the spirit of the VIM editor. But it's not for VIM users only, it's for anyone who just needs some more shortcuts to his own functions.

[Surfingkeys]: https://github.com/brookhong/Surfingkeys

## 6. For the Developer

### 6.1. How does this work?

note: I have not changed the text or code referenced below, this is all from the original dev of [ogs kbd nav]

I'm basically using the [`StoneMarkerUi`][stonemarkerui] class to draw a canvas on top of the existing OGS ones with the movable marker. It would be tough to make it work with the same existing canvas because erasing stuff while OGS tries to draw its own doesn't work very well in HTML.

A possibly easier way of doing all this would be to use the global variable `global_goban`, which OGS makes available on its pages &mdash; I didn't know of its existence until [Akita Noek][anoek], the main developer of OGS, mentioned it to me. It is also kind of tricky to use global variable in browser extension contexts because most of the standardized files live in isolated worlds, but a solution to this problem can be found [here][so_global_variable].

Lastly, to draw the markers with size and positioning proportional to OGS', I essentially used a brute force approach. I've manually and visually worked out the size and positioning through approximations while with a fixed sized goban on my screen. And then I simply created a `ratio` property based on that goban size, which would be used to multiply the default sizes and positions I had originally worked out. Surprisingly, this approach was enough to make things work. 

[anoek]: https://github.com/anoek
[so_global_variable]: https://stackoverflow.com/a/64823100/4756173
[stonemarkerui]: lib/src/ui/stone_marker_ui.ts

### 6.2. Compiling with TypeScript

The JS code won't be version controlled (`dist`), the programmer should be able to easily recreate it by compiling it from the TS code (`src`).

Simply use this to compile the TS code to JS:

```cmd
tsc -w
```

### 6.3. Compiling with Webpack

After installing the `webpack-cli` package, run:

```cmd
npx webpack -w
```

to enable compilation bundling and minifying on watch mode.

### 6.4. Running Tests

If you use `tsc -w`, you can either use `npm t` to run tests with [Jest][jest] or use the following to watch the tests as the code changes with `tsc -w`:

```cmd
npm t -- --watch
```

[jest]: https://jestjs.io/en/

### 6.5. The Complete Development Setup

The current setup will compile TS code to JS into the `dist/dev` folder for testing purposes (TDD), while compiling production code into the `dist/prod` folder for (manual) testing inside the browser.

You can achieve all of that at the same time by opening at least 3 terminals and running the following under watch mode &mdash; these commands were all described in the sections above &mdash;:

- `tsc -w`
- `npx webpack -w`
- `npm t -- --watch`

[ogs kbd nav]: https://github.com/FanaroEngineering/ogs_kbd_nav
