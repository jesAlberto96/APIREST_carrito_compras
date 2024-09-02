import mongoose, { Schema } from "mongoose";

const shoppingCartSchema = new mongoose.Schema({
    status: {
        type: Schema.Types.ObjectId,
        ref: 'StatusShoppingCart',
        required: true
    },
    total: {
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

export const ShoppingCartModel = mongoose.model('shopping_cart', shoppingCartSchema);