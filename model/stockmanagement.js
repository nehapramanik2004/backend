import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const stockmanagementSchema = new Schema({
   product_id:{ type:String},
   quantities:{ type: Number},
   restock_date:{ type:String },
   reorder_level:{ type :String},  

   


}, { timestamps: true }); // Correct placement of timestamps

const stockmanagement = model('stockmanagement', stockmanagementSchema);

export default stockmanagement;