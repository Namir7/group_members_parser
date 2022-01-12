const fs = require('fs/promises');
const path = require('path');

module.exports = async () => {
   const usersDataPath = path.resolve(__dirname, '..', '..', 'output', 'users.json');

   const users = await fs.readFile(usersDataPath, {
         encoding: 'utf8'
      })
      .then(result => JSON.parse(result));

   return users.filter(user => user.can_write_private_message && !user.alreadyWrote)
}