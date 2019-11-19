# ReasonML Console Formatter

Transforms ReasonML types to a readable format when they are logged to the [Chrome console](https://developers.google.com/web/tools/chrome-devtools/console/?hl=es) or [NodeJS console](https://nodejs.org/api/console.html).

#### Status: ⚠️ Doesn't work with all the types. Only [Lists](https://reasonml.github.io/docs/en/list-and-array) & nested Lists, for now 🤘

[![CircleCI](https://circleci.com/gh/davesnx/reason-console-formatter/tree/master.svg?style=svg)](https://circleci.com/gh/davesnx/reason-console-formatter/tree/master)

![](/docs/demo.png)

### Install as a module (recomended)
You can install it on your application or your library via npm/yarn.

```bash
npm install reason-console-formatter --dev
# or yarn
yarn add reason-console-formatter --dev
```

```ocaml
[@bs.module "reason-console-formatter"]
external install: unit => unit = "default";

install();
```

### Install as a chrome extension
Add it to your Chrome: [https://chrome.google.com/webstore/detail/reasonml-formatter](https://chrome.google.com/webstore/detail/reasonml-formatter/jfgngkbfmnccnokfkajhloldhkgeking)

### Usage

You need to **enable Custom Formatters** in the DevTools settings in order to have this working.

### Step 1: Open DevTools settings

![](/docs/chrome-settings.png)

### Step 2: Enable custom formatters

![](/docs/chrome-enable-custom-formatters.png)

Note: You might need to refresh the page first time you open Console panel with existing logs - custom formatters are applied only to newly printed console messages.

## How it works

Detects at runtime what kind of data structures are you logging into the console and maps them to ReasonML types.

Right now, BuckleScript has a debug flag (`"-bs-g"`) that labels some of the types with some JavaScript Symbols that can be catched by this extension and pretty prints them:

![](/docs/future-demo.png)
> This is the output of the tests, the future of this extension. Right now, you can take a look at `test/bs-demo/README.md` to get a better idea on what's keeping us to implement that! Thanks! 😄

Right now `bs-g`, aside from the labeling does a little bit of formatting as well. The down-site is that it contains a lot of bugs and isn't something easy to refactor. [@bobzhang](https://github.com/bobzhang) said that this part of Bucklescript's source code is a mess.

The idea is to create a extension that delivers a great developer experience that could replace at some point the flag and extract that debug logic from BuckleScript.

If you want to know more about this check `test/bs-demo/README.md` or DM me on the discord.

If you miss some type that you thing would be helpful, [let me know, by opening a new Issue!](https://github.com/davesnx/reason-formatter/issues/new)

## Development

1. Clone this repo
2. `$ yarn` - Install dependencies
3. `$ yarn dev` - Compile
3. `$ cd test/BuckleScript` - Go to a demo page
4. `$ yarn` - Install dependencies of the demo
5. `(new tab) $ yarn start` - Start the server
6. `(new tab) $ yarn watch` - Compile Reason code
7. Open "localhost:1234"

## Credit

Based on [immutable-devtools](https://github.com/andrewdavey/immutable-devtools) and inspired by the awesome [cljs-devtools](https://github.com/binaryage/cljs-devtools).

