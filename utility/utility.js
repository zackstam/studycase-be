const bcrypt = require('bcryptjs');
const { AbilityBuilder, createMongoAbility } = require('@casl/ability')

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
    can('view', 'User', { user_id: user.userId }),
    can('view', 'Order'),
    can('create','Order'),
    can('read','Order', { user_id: user.userId }),
    can('update','User', { user_id: user.userId }),
    can('read','Cart', { user_id: user.userId }),
    can('view', 'DeliveryAddress'),
    can('create','DeliveryAddress', { user_id: user.userId }),
    can('update','DeliveryAddress', { user_id: user.userId }),
    can('delete', 'DeliveryAddress', { user_id: user.userId }),
    can('read', 'Invoice', { user_id: user.userId })
  } else {
    can('manage', 'all')
  }
  return build();
}

module.exports = {
    defineAbilityFor,
    hashing
}