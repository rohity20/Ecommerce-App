import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
   
    productId: {
        type: String,
        required: true,
      },
    newprice: {
      type: Number,
      required: true,
    },
    status: {
        type: String,
        default: "process",
    },
    userId: {
        type: String,
        required: true
      },
  
  },
  { timestamps: true }
);

export default mongoose.model("Price", priceSchema);
