const path = require('path');

class StorageService {
   constructor() {
      this._dataFolder = path.resolve(__dirname, '..', '..', 'output');
   }
}

module.exports = new StorageService();