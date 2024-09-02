import { CustomError } from "../../helpers/errors/custom.error";

export class ShoppingCartEntity{
    constructor(
        public id: string,
        public total: number,
        public createdAt: Date,
        public updatedAt?: string,
    ){}

    static fromObject(object: {[key:string]:any}) {
        const { id, _id, total, createdAt, updatedAt } = object;

        if (!_id && !id){
            throw CustomError.badRequest('Missing id');
        }

        if (!total){
            throw CustomError.badRequest('Missing total');
        }

        return new ShoppingCartEntity(_id || id, total, createdAt, updatedAt);
    }
}