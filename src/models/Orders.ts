import { Schema, model, Document } from "mongoose";
import { IUser } from "./User";

export interface IOrders extends Document {
  name: string;
  link: string;
  details: string;
  amount: number;
  //owner: string;
  users: Array<IUser>;
  date_created: string;
  date_limit: string;
  status: boolean;
}

const orderSchema = new Schema<IOrders>(
  {
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
        firstName: {
          type: String,
          require: true,
        },
        lastName: {
          type: String,
          require: true,
        },
        email: {
          type: String,
          require: true,
          lowercase: true,
          unique: true,
        },
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
