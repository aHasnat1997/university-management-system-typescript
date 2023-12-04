import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    databaseURL: process.env.DEV_DB_URL,
    bcrypt_salt: process.env.BCRYPT_SALT,
    user_default_password: process.env.USER_DEFAULT_PASSWORD
};