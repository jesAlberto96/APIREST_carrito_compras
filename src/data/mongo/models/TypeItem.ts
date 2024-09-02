import mongoose from "mongoose";

const typeItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name is required' ],
        unique: true
    },
    code: {
        type: String,
        required: [ true, 'Code is required' ],
        unique: true
    },
});

export const TypeItemModel = mongoose.model('type_item', typeItemSchema);