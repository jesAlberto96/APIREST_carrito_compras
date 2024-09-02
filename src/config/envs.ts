import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    MONGO_DB_USERNAME: get('MONGO_DB_USERNAME').required().asString(),
    MONGO_DB_PASSWORD: get('MONGO_DB_PASSWORD').required().asString()
}