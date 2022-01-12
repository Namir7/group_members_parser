const timeout = require('./promisify-timeout');
const random = require('./get-random');

module.exports = async (page, message, options = {
   interval: null
}) => {
   const interval = options.interval || [500, 500];
   // const interval = options.interval || [150, 300];

   for (let i = 0; i < message.length; i++) {
      await page.keyboard.type(message[i]);
      await timeout(random(...interval));
   }
};