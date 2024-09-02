import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name is required' ],
    },
    code: {
        type: String,
        required: [ true, 'Code is required' ],
        unique: true
    },
});

export const StatusShoppingCartModel = mongoose.model('status_shopping_cart', statusSchema);