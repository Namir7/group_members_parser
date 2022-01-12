class User {
   constructor(payload) {
      this.id = payload.id;
      this.can_write_private_message = payload.can_write_private_message;
      this.alreadyWrote = false;
   }
}

module.exports = User;