import { Schema, model, Document } from "mongoose";
import { IUser } from "./User";
import mongoose from "mongoose";

export interface IOrders extends Document {
  owner: IUser["_id"];
  name: string;
  link: string;
  details: string;
  amount: number;
  users?: IUser["_id"];
  date_created: string;
  date_limit: string;
  status: boolean;
}

const orderSchema = new Schema<IOrders>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      require: true,
    },
    link: {
      type: String,
      require: true,
    },
    details: {
      type: String,
      require: true,
      lowercase: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    date_created: {
      type: String,
      require: true,
    },
    date_limit: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
  },
  {
    collection: "orders",
  }
);

export default model<IOrders>("Orders", orderSchema);
