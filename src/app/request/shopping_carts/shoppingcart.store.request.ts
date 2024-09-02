export class ShoppingCartStoreRequest {
    constructor(
        public items: { [key: string]: any },
    ){}

    static create(object: { [key:string]: any } ): [string?, ShoppingCartStoreRequest?]{
        const { items } = object;

        if (!items) return ['items is required'];

        for (const item of items) {
            if (!item.item) return ['Item is required'];
            if (!item.amount) return ['Amount is required'];
            if (isNaN(Number(item.amount))) return ['Amount must be a number'];
            if (+item.amount === 0) return ['Amount cannot be 0'];
        }

        return [undefined, new ShoppingCartStoreRequest(items)];
    }
}