import { ItemModel, ShoppingCartDetailModel, ShoppingCartModel, StatusShoppingCartModel, TypeItemModel } from "../../data/mongo";
import { CustomError } from "../../helpers/errors/custom.error";
import { ItemEntity } from "../entities/item.entity";
import { ShoppingCartEntity } from "../entities/shopping.cart.entity";
import { ItemUpdateRequest } from "../request/items/item.update.request";
import { ShoppingCartStoreRequest } from "../request/shopping_carts/shoppingcart.store.request";

export class ShoppingCartService {

    constructor(){}

    async create(shoppingCartStoreRequest: ShoppingCartStoreRequest) {
        const { items } = shoppingCartStoreRequest;
        const response = await this.handleItems(items);
        const { total, itemSelected } = response;

        try {
            const data = await this.saveShopCart(total);

            this.saveShopCartDetails(itemSelected, data);

            return this.generateBillHTML(data,itemSelected);
        } catch (error) {
            throw CustomError.internalServer('Error innesperado');
        }
    }

    private handleItems = async (items: {[key:string]:any}) => {
        let total = 0;
        const itemSelected = [];
        for (const [, value] of Object.entries(items)) {
            const data = await ItemModel.findById(value.item);
            if (value.amount != 0){
                const hasItem: boolean = itemSelected.some(item => item.item === value.item);
                if (!hasItem){
                    itemSelected.push({
                        item: value.item,
                        amount: value.amount,
                        name: data!.name,
                        description: data!.description,
                        price: data!.price,
                        stock: data!.stock,
                        subtotal: (data!.price * +value.amount),
                    });
                } else {
                    const itemToUpdate: any = itemSelected.find(item => item.item === value.item);

                    if (itemToUpdate) {
                        itemToUpdate.amount = ((+itemToUpdate.amount) + (+value.amount));
                        itemToUpdate.subtotal = ((data!.price * +value.amount) + itemToUpdate.subtotal);
                    }
                }

                if (value.amount > data!.stock){
                    throw CustomError.badRequest(`El item ${data!.name} se encuentra agotado, la cantidad disponible es ${data!.stock}`);
                }
            }
            total = (total + (data!.price * +value.amount));
        }

        return {
            itemSelected,
            total
        }
    }

    private saveShopCart = async (total: number) => {
        const dataStatus = await StatusShoppingCartModel.findOne({code: 'pagado'});
        if (!dataStatus) throw CustomError.badRequest('Status not exists');

        const data = new ShoppingCartModel({
            status: dataStatus.id,
            total,
        });
        await data.save();

        return data;
    }

    private saveShopCartDetails = async (itemSelected: {[key:string]:any}[], data: {[key:string]:any}) => {
        for (const item of itemSelected) {
            const detail = new ShoppingCartDetailModel({
                shopping_cart: data._id,
                item: item.item,
                amount: item.amount,
                price: item.price,
                subtotal: item.subtotal,
            });

            await detail.save();

            let newStock = Math.abs(item.amount - item.stock);
            if (newStock < 0){
                newStock = 0;
            }

            await ItemModel.findOneAndUpdate({_id: item.item}, {stock: newStock});
        }
    }

    private generateBillHTML = (data: {[key:string]:any}, itemSelected: {[key:string]:any}[]) => {
        let html = `<table>
                <thead>
                    <tr>
                        <th>Nombre del ítem</th>
                        <th>Tipo de ítem</th>
                        <th>Unidades</th>
                        <th>Precio unitario</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>`;

        let totalItems = 0;
        itemSelected.map((item) => {
            totalItems = (totalItems+item.amount)
            html += `
                <tr>
                    <td>${item.name}</td>
                    <td>Producto</td>
                    <td>${item.amount}</td>
                    <td>${item.price} €</td>
                    <td>${item.subtotal} €</td>
                </tr>
            `;
        });

        html += `
            <tr class="total-row">
                <td class="total-label">Total</td>
                <td></td>
                <td>${totalItems}</td>
                <td></td>
                <td>${data.total} €</td>
            </tr>
            </tbody>
            </table>
        `;

        return html;
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