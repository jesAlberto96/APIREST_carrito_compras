import mongoose, { Schema } from "mongoose";

const shoppingCartDetailSchema = new mongoose.Schema({
    shopping_cart: {
        type: Schema.Types.ObjectId,
        ref: 'shopping_cart',
        required: true
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
        required: true
    },
    amount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    subtotal: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date
    },
});

export const ShoppingCartDetailModel = mongoose.model('shopping_cart_detail', shoppingCartDetailSchema);