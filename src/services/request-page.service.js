const fs = require('fs');

const autoScroll = require('../scripts/autoscroll');

const requestPageService = async (browser) => {
   const url = `https://vk.com/search?c[section]=people&c[group]=${process.env.GROUP_NUMBER_2}`

   const page = await browser.newPage();

   await page.goto(url);

   await autoScroll(page);

   const data = await page.evaluate(
      () => document.querySelector('*').outerHTML
   );

   fs.writeFileSync(
      path.resolve(__dirname, '..', '..', process.env.OUTPUT_DIR || 'output', 'page.html'),
      data, {
         encoding: 'utf8'
      })
};

module.exports = requestPageService;