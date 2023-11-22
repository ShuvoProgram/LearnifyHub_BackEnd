import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5001,
    url: process.env.PRODUCTION_URL || process.env.LOCAL_URL,
    database_url: process.env.DATABASE_URI,
    bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expires_in: process.env.ACCESS_TOKEN_EXPIRATION,
        refresh_secret: process.env.REFRESH_TOKEN_SECRET,
        refresh_expires_in: process.env.REFRESH_TOKEN_EXPIRATION,
    }
}