import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  photo: string;
  password:string;
}

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String , unique: true  },
    email: { type: String, unique: true },
    photo: { type: String },
    password:{type:String},
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true, collection: "customer" }
);

export const UserModel = mongoose.model<IUser>(
  "user",
  userSchema
);
