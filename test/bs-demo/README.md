# Basic Reason Demo

This project allows us to test the output of BuckleScript in an end to end fashion.
Need to follow some steps to run the tests with our custom formatter:

# Steps to test:
1. Go to `test/bs-demo/node_modules/bs-platform/lib/es6/caml_chrome_debugger.js`
2. Remove line 157 & 159
```js
if (typeof window === "undefined"){
 // global.devtoolsFormatters = [formatter]
} else {
 // window.devtoolsFormatters = [formatter]
}
```
3. Install dependencies: `yarn`
4. Build with `yarn start`
5. Compile the page: `$ npx parcel serve index.html`
6. Open `localhost:1234`
