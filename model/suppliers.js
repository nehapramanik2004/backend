import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const supplierSchema = new Schema({
   Suppliers_Name:{ type:String},
   email:{ type: String},
   mobile_Number:{ type:Number },
   address:{ type :String},
   status:{type:String},

   


}, { timestamps: true }); // Correct placement of timestamps

const supplier = model('supplier', supplierSchema);

export default supplier;