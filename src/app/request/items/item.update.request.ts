export class ItemUpdateRequest {
    constructor(
        public stock: number,
        public price: number,
        public type_item: string,
        public description?: string,
    ){}

    static create(object: { [key:string]: any } ): [string?, ItemUpdateRequest?]{
        const { description, stock, price, type_item } = object;

        if (!stock) return ['Stock is required'];
        if (isNaN(Number(stock))) return ['Stock must be a number'];
        if (!price) return ['Price is required'];
        if (isNaN(Number(price))) return ['Stock must be a number'];
        if (!type_item) return ['Type item is required'];

        return [undefined, new ItemUpdateRequest(stock, price, type_item, description)];
    }
}