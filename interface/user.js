class Entity {
    constructor(attrs) {
      Object.assign(this, attrs);
    }
}
  
class User extends Entity {}

class DeliveryAddress extends Entity {}

class CartItem extends Entity {}

module.exports = {
    User,
    DeliveryAddress,
    CartItem
}