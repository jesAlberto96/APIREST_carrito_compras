import { envs } from "./config/envs";
import { Server } from "./config/server";
import { MongoDatabase } from "./data/mongo/MongoDataBase";
import { AppRoutes } from "./routes";

(async() => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    })

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });

    server.start();
}


