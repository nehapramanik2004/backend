import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userchema = new Schema({
   user_Name:{ type:String},
   password:{ type:String},

   


}, { timestamps: true }); // Correct placement of timestamps

const user = model('user', userchema);

export default user;