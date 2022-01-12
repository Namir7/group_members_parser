const type = require('../utils/type');

const login = async (page) => {
   const url = 'https://vk.com/login';

   await page.goto(url);

   const phone = process.env.VK_USER_PHONE;
   const pass = process.env.VK_USER_PASSWORD;

   await page.focus('input#email');
   await type(page, phone);

   await page.focus('input#pass');
   await type(page, pass);

   await Promise.all([
      page.waitForNavigation(),
      page.click('button[type="submit"]')
   ]);

   return page
}

module.exports = login;