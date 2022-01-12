const type = require('../utils/type');
const timeout = require('../utils/promisify-timeout');

const sendMessage = async (page, payload) => {
   const {
      userId,
      message,
   } = payload

   const url = `https://vk.com/write${userId}`;

   page.goto(url);

   const selector = 'div.im_editable.im-chat-input--text._im_text';
   const sendSelector = 'button.im-send-btn._im_send';

   await page.waitForSelector(selector);

   await page.focus(selector);
   await type(page, message);
   
   page.click(sendSelector)
   await timeout(1000);
};

module.exports = sendMessage;
