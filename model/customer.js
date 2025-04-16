import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const customerSchema = new Schema({
   customer_Name:{ type:String},
   email:{ type: String},
   mobile_Number:{ type:Number },
   address:{ type :String},
   status:{type:String},

   


}, { timestamps: true }); // Correct placement of timestamps

const customer = model('customer', customerSchema);

export default customer;