import mongoose, { Schema } from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name is required' ],
    },
    stock: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    type_item: {
        type: Schema.Types.ObjectId,
        ref: 'TypeItem',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date
    },
});

export const ItemModel = mongoose.model('item', itemSchema);