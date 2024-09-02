import { CustomError } from "../../helpers/errors/custom.error";

export class ItemEntity{
    constructor(
        public id: string,
        public name: string,
        public price: number,
        public stock: number,
        public type_item: string,
        public createdAt: Date,
        public description?: string,
        public updatedAt?: string,
    ){}

    static fromObject(object: {[key:string]:any}) {
        const { id, _id, name, description, price, stock, type_item, createdAt, updatedAt } = object;

        if (!_id && !id){
            throw CustomError.badRequest('Missing id');
        }

        if (!name){
            throw CustomError.badRequest('Missing name');
        }

        if (!description){
            throw CustomError.badRequest('Missing description');
        }

        if (!stock){
            throw CustomError.badRequest('Missing stock');
        }

        if (!type_item){
            throw CustomError.badRequest('Missing type_item');
        }

        if (!price){
            throw CustomError.badRequest('Missing price');
        }

        return new ItemEntity(_id || id, name, price, stock, type_item, createdAt, description, updatedAt);
    }
}