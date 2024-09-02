export class ItemStoreRequest {
    constructor(
        public name: string,
        public stock: number,
        public price: number,
        public type_item: string,
        public description?: string,
    ){}

    static create(object: { [key:string]: any } ): [string?, ItemStoreRequest?]{
        const { name, description, stock, price, type_item } = object;

        if (!name) return ['Name is required'];
        if (!stock) return ['Stock is required'];
        if (isNaN(Number(stock))) return ['Stock must be a number'];
        if (!price) return ['Price is required'];
        if (isNaN(Number(price))) return ['Stock must be a number'];
        if (!type_item) return ['Type item is required'];

        return [undefined, new ItemStoreRequest(name, stock, price, type_item, description)];
    }
}