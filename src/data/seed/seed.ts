import { envs } from "../../config/envs";
import { ItemModel, MongoDatabase, ShoppingCartModel, StatusShoppingCartModel, TypeItemModel } from "../mongo";
import { seedData } from "./data";

(async() => {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    });

    await main();

    await MongoDatabase.disconnect();
})();

async function main() {
    await Promise.all([
        TypeItemModel.deleteMany(),
        ItemModel.deleteMany(),
        StatusShoppingCartModel.deleteMany(),
        ShoppingCartModel.deleteMany(),
    ]);

    const typeItems = await TypeItemModel.insertMany(seedData.type_items);
    await StatusShoppingCartModel.insertMany(seedData.status_shopping_cart);
    await ItemModel.insertMany(
        seedData.items.map(item => {
            return {
                ...item,
                type_item: typeItems[0].id
            }
        })
    );

    console.log('SEEDED');
}