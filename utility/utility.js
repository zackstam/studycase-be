const bcrypt = require('bcryptjs');
const { AbilityBuilder, createMongoAbility } = require('@casl/ability')
const User = require('../models/userModel')
const DeliveryAddress = require('../models/deliveryAddressModel')

const hashing = async (plainPassword) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt)
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}


const defineAbilityFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
  console.log(user.userId);
  if (user.role === 'admin') {
    can('manage', 'all')
  } else if (user.role === 'user') {
    can('read', 'User'),
    can('view', 'User', { user_id: user.userId }),
    cannot('create','User'),
    can('update','User', { user_id: user.userId }),
    can('delete', 'User', { user_id: user.userId }),
    cannot('detail', 'DeliveryAddress'),
    can('view', 'DeliveryAddress',  { user_id: user.userId }),
    can('create','DeliveryAddress', { user_id: user.userId }),
    can('update','DeliveryAddress', { user_id: user.userId }),
    can('delete', 'DeliveryAddress', { user_id: user.userId }),
    cannot('detail', 'CartItem'),
    can('view', 'CartItem',  { user_id: user.userId }),
    can('create','CartItem', { user_id: user.userId }),
    can('update','CartItem', { user_id: user.userId }),
    can('delete', 'CartItem', { user_id: user.userId })
  } else {
    can('read', 'Product')
  }
  return build();
}

module.exports = {
    defineAbilityFor,
    hashing
}