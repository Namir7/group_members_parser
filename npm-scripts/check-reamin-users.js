const fs = require('fs/promises');
const path = require('path');

const checkRemainUsers = async () => {
   const usersPath = path.resolve(__dirname, '..', 'output', 'users.json');

   const users = await fs.readFile(usersPath, {
      encoding: 'utf-8'
   }).then(res => JSON.parse(res));

   const availableUsers = users.filter(user => user.can_write_private_message && !user.alreadyWrote);
   
   const messagedUsers = users.filter(user => user.alreadyWrote);

   console.log(`all users: ${users.length}`);
   console.log(`remain users: ${availableUsers.length}`);
   console.log(`messaged users: ${messagedUsers.length}`);
};

checkRemainUsers();