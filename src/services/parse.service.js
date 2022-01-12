const fs = require('fs/promises');
const path = require('path');
const cheerio = require('cheerio');

const User = require('../factories/user.factory');

const parseService = async () => {
   const pagePath = path.resolve(__dirname, '..', 'output', 'page.html');

   const usersPath = path.resolve(__dirname, '..', 'output', 'users.json');

   const data = await fs.readFile(pagePath, {
      encoding: 'utf8'
   });

   const $ = cheerio.load(data);

   const wrapperSelector = 'div#results'
   const elementSelector = 'div.people_row.search_row';

   const users = $(wrapperSelector)
      .find(elementSelector)
      .toArray()
      .map((el) => {
         const id = el.attribs['data-id'];

         return new User({
            id
         });
      })

   await fs.writeFile(usersPath, JSON.stringify({
      users
   }), {
      encoding: 'utf8'
   })
}

module.exports = parseService;