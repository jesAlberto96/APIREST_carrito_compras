import { ItemModel, TypeItemModel } from "../../data/mongo";
import { CustomError } from "../../helpers/errors/custom.error";
import { ItemEntity } from "../entities/item.entity";
import { ItemStoreRequest } from "../request/items/item.store.request";
import { ItemUpdateRequest } from "../request/items/item.update.request";

export class ItemService {

    constructor(){}

    async create(itemStoreRequest: ItemStoreRequest) {
        const categoryExists = await ItemModel.findOne({name: itemStoreRequest.name});
        if (categoryExists) throw CustomError.badRequest('Item already exists');
        const typeItem = await TypeItemModel.findOne({code: itemStoreRequest.type_item});
        if (!typeItem) throw CustomError.badRequest('Type item not exists');

        try {
            const item = new ItemModel({
                ...itemStoreRequest,
                type_item: typeItem.id
            });

            await item.save();

            const itemEntity = ItemEntity.fromObject(item);

            return itemEntity;
        } catch (error) {
            throw CustomError.internalServer('Error innesperado');
        }
    }

    async update(id: string, itemUpdateRequest: ItemUpdateRequest) {
        const item = await ItemModel.findById(id);
        if (!item) throw CustomError.notFound('Item not found');
        const typeItem = await TypeItemModel.findOne({code: itemUpdateRequest.type_item});
        if (!typeItem) throw CustomError.badRequest('Type item not exists');

        try {
            const itemUpdated = await ItemModel.findByIdAndUpdate(id, {
                ...itemUpdateRequest,
                type_item: typeItem.id
            });

            return ItemEntity.fromObject(itemUpdated!);
        } catch (error) {
            console.log(error);
            throw CustomError.internalServer('Error innesperado');
        }
    }

    async getItems() {
        try {
            const items = await ItemModel.find();

            return items.map(ItemEntity.fromObject);
        } catch (error) {
            throw CustomError.internalServer('Error innesperado');
        }
    }

    async getItem(id: string) {
        try {
            const item = await ItemModel.findById(id);

            if (!item) throw CustomError.notFound('Item not found');

            return ItemEntity.fromObject(item!);
        } catch (error) {
            throw CustomError.notFound('Item not found');
        }
    }

    async getTypesItems() {
        try {
            const typesItems = await TypeItemModel.find();

            return typesItems;
        } catch (error) {
            throw CustomError.internalServer('Error innesperado');
        }
    }
}