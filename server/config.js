const rootPath = __dirname;
module.exports = {
    rootPath,
    PORT: 8008,
    DB: {
        URL: 'mongodb://localhost:27017',
        NAME: 'personal_finance'
    },
    JWT_SECRET: 'MY_JWT_SECRET_PHRASE',
    USERNAME_MIN_LENGHT: 4,
    PASSWORD_MIN_LENGHT: 6
}