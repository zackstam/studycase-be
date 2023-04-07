class Entity {
    constructor(attrs) {
      Object.assign(this, attrs);
    }
}
  
class User extends Entity {}

module.exports = {
    User
}