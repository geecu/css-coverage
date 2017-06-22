# [WIP]CSS coverage

Remove unused CSS rules using Chrome headless browser

TODO:

- [ ] Tests
- [ ] Launch Chrome automatically
- [ ] CLI

## Usage

Run Chrome in headless mode:

On Mac:
```
/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --headless --disable-gpu --remote-debugging-port=9222
```

```
git clone git@github.com:geecu/css-coverage.git
cd css-coverage
yarn
cp config.json{.dist,}
yarn start
```
