const CDP = require('chrome-remote-interface');

const getUsage = (url, { port = 9222 } = {}) =>
  new Promise((resolve, reject) => {

    CDP({ port }, (client) => {
      // extract domains
      const { DOM, CSS, Network, Page } = client;

      const timeout = setTimeout(() => {
        console.error('Timeout, closing client')
        client.close();
      }, 10000)

      const terminate = () => {
        client.close();
        clearTimeout(timeout);
      }
      const terminateCatch = (err) => {
        console.error(err);

        terminate();

        reject(err);
      }

      Page.loadEventFired(() => {
        CSS.stopRuleUsageTracking()
          .then(({ ruleUsage }) => {
            const styleSheetIds = ruleUsage
              .filter(rule => rule.used)
              .map(rule => rule.styleSheetId)
              .reduce((prev, cur) => prev.includes(cur) ? prev : prev.concat([ cur ]), [])

            return Promise.all(
              styleSheetIds
                .map(styleSheetId => CSS.getStyleSheetText({ styleSheetId }))
            )
              .then(styleSheetTexts => ruleUsage.map(rule => Object.assign({}, rule, {
                styleSheetText: styleSheetTexts[ styleSheetIds.indexOf(rule.styleSheetId) ].text.substr(rule.startOffset, rule.endOffset)
              })))
          })
          .then(rulesWithText =>
            resolve(rulesWithText)
          )
          .then(() => {
            client.close();
            clearTimeout(timeout);
          })
          .catch(terminateCatch)
      });

      Promise.all([
        Page.enable(),
        DOM.enable(),
        CSS.enable(),
      ])
        .then(CSS.startRuleUsageTracking)
        .then(() => Page.navigate({ url }))
        .catch(terminateCatch)

    }).on('error', (err) => {
      // cannot connect to the remote endpoint
      console.error(err);
    });
  });


module.exports = getUsage;
