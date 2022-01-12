const fs = require('fs/promises');
const path = require('path');

const login = require('../actions/login.action');
const sendMessage = require('../actions/send-message.action');

const fileExists = require('../utils/file-exists');
const timeout = require('../utils/promisify-timeout');

module.exports = async (context) => {
   let page = await context.pages().then(res => res[0]);

   // set cookies
   const cookiesPath = path.resolve(__dirname, '..', '..', 'output', 'cookies.json');

   if (!await fileExists(cookiesPath)) {

      page = await login(page);

      const cookies = await page.cookies();

      await fs.writeFile(cookiesPath, JSON.stringify(cookies))
   }

   const cookies = await fs.readFile(cookiesPath, {
         encoding: 'utf-8'
      })
      .then(result => JSON.parse(result));

   await page.setCookie(...cookies);

   await page.goto('https://vk.com/feed');

   await timeout(1000);

   const usersDataPath = path.resolve(__dirname, '..', 'output', 'users.json');
   const usersDataBackupPath = path.resolve(__dirname, '..', 'output', 'users.backup.json');

   const users = await fs.readFile(usersDataPath, {
         encoding: 'utf8'
      })
      .then(result => JSON.parse(result));

   const availableUsers = users.filter(user => user.can_write_private_message && !user.alreadyWrote);

   const message = 'Доброго времени суток. Вступайте в беседу в telegram для поиска попутчиков на горнолыжные склоны в Татарстане: https://t.me/group_83839';

   // write backup
   await fs.writeFile(usersDataBackupPath, JSON.stringify(users), {
      encoding: 'utf-8'
   });

   const quantity = 10;

   let i = 0;

   for (let user of availableUsers.slice(0, quantity)) {
      console.log(`sending messages: ${i} / ${availableUsers.slice(0, quantity).length}...`);
      console.log(`id: ${user.id}\n`);

      await sendMessage(page, {
         userId: user.id,
         message,
      });

      user.alreadyWrote = true;

      // write new data
      await fs.writeFile(usersDataPath, JSON.stringify(users), {
         encoding: 'utf-8'
      });
      i++;
   }
};