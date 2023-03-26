require('dotenv').config()
module.exports = {
    secretKey: process.env.SECRET_KEY,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    portApp: process.env.APP_PORT,
    dbPort: process.env.DB_PORT,
    product: process.env.PRODUCT
}