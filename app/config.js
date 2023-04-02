const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
module.exports = {
    rootPath: path.resolve(__dirname, '...'),
    serviceName: process.env.SERVICE_NAME,
    secretKey: process.env.SECRET_KEY,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    portApp: process.env.APP_PORT,
    hostApp: process.env.HOST_APP,
    product: process.env.PRODUCT
}