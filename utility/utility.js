const bcrypt = require('bcryptjs');


const hashing = async (plainPassword) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt)
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    hashing
}