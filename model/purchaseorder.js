import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const purchaseorderSchema = new Schema({
   supplier_id:{ type:String},
   order_Date:{ type: String},
   expected_Date:{ type: String},
   status:{type:String},

}, { timestamps: true }); // Correct placement of timestamps

const purchaseorder = model('purchaseorder', purchaseorderSchema);

export default purchaseorder;