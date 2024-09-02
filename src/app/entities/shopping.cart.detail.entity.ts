import { CustomError } from "../../helpers/errors/custom.error";

export class ShoppingCartDetailEntity{
    constructor(
        public id: string,
        public shopping_cart: string,
        public item: string,
        public amount: number,
        public price: number,
        public subtotal: number,
        public createdAt: Date,
        public updatedAt?: string,
    ){}

    static fromObject(object: {[key:string]:any}) {
        const { id, _id, shopping_cart, item, amount, price, subtotal, createdAt, updatedAt } = object;

        if (!_id && !id){
            throw CustomError.badRequest('Missing id');
        }

        if (!shopping_cart){
            throw CustomError.badRequest('Missing shopping cart');
        }

        if (!item){
            throw CustomError.badRequest('Missing item');
        }

        if (!amount){
            throw CustomError.badRequest('Missing amount');
        }

        if (!price){
            throw CustomError.badRequest('Missing price');
        }

        if (!subtotal){
            throw CustomError.badRequest('Missing subtotal');
        }

        return new ShoppingCartDetailEntity(_id || id, shopping_cart, item, amount, price, subtotal, createdAt, updatedAt);
    }
}