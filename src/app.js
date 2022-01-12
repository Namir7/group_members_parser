require('dotenv').config();

const puppeteer = require('puppeteer');

const sendMessagesScenario = require('./scenarios/send-messages.scenario');

(async () => {
   const browser = await puppeteer.launch({
      headless: false,
      timeout: 0,
      defaultViewport: {
         height: 800,
         width: 1200
      }
   });

   const context = await browser.defaultBrowserContext();

   await sendMessagesScenario(context);

   browser.close();
})();