const fs = require('fs/promises');
const path = require('path');

const vkService = require('./vk.service');
const User = require('../factories/user.factory');

const divideArray = require('../utils/divide-users');

const formatDataService = async () => {
   // formats data from txt format fo JSON
   const inputPath = path.resolve(__dirname, '..', '..', 'output', 'users.txt');
   const outputPath = path.resolve(__dirname, '..', '..', 'output', 'users.json');

   const data = await fs.readFile(inputPath, {
      encoding: 'utf8'
   });

   const usersIds = data.split('\n');

   const dividedUsers = divideArray(usersIds, 500);

   const values = await Promise.all(
      dividedUsers.map(usersBunch => vkService.getUsers(usersBunch))
   );

   const users = values.flat().map(userData => new User(userData));

   await fs.writeFile(outputPath, JSON.stringify(users), {
      encoding: 'utf8'
   })
}

module.exports = formatDataService;