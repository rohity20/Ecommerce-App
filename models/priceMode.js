import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    // slug: {
    //   type: String,
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   required: true,
    // },

    productId: {
        type: mongoose.ObjectId,
        ref: "Products",
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
        type: mongoose.ObjectId,
        ref: "users",
      },
    
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
    // photo: {
    //   data: Buffer,
    //   contentType: String,
    // },
    // shipping: {
    //   type: Boolean,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Price", priceSchema);
