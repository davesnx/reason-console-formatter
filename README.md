# ReasonML Console Formatter

![](./docs/demo.png)

### Status: ALPHA
Read "How it works" section.

Transforms ReasonML types to a readable format when they are logged to the [Chrome console](https://developers.google.com/web/tools/chrome-devtools/console/?hl=es) or [NodeJS console](https://nodejs.org/api/console.html).

More information about the Chrome Extension comming soon...

The Chrome extension only works if you **enable Custom Formatters** in the DevTools settings.

### Step 1: Open DevTools settings

![](./docs/chrome-settings.png)

### Step 2: Enable custom formatters

![](./docs/chrome-enable-custom-formatters.png)

## How it works

Detects at runtime what kind of data structures are you logging into the console and maps them to ReasonML types.

Currently supported:
For now we only support Lists, since Records are not possible to detect them at runtime. Waiting for BuckleScript to treat Records as JS Objects (https://github.com/BuckleScript/bucklescript/issues/2922, not happening soon).

If you miss some type that you thing would be helpful, [let me know, by opening a new Issue!](https://github.com/davesnx/reason-formatter/issues/new)

## Development

1. Clone this repo
2. Go to chrome extensions chrome://extensions
3. Click on load unpacked extension and select the "/extension" directory of the cloned repo
4. `npm install`
5. `npm run dev`
6. Open "/test/index.html" (`open /test/index.html`) to check run some tests

## Credit

Based on [immutable-devtools](https://github.com/andrewdavey/immutable-devtools).
