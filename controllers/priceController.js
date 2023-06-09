import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import priceModel from "../models/priceModel.js";

import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();


export const createPriceController = async (req, res) => {
  try {
    console.log("Inside controller");
    console.log(req.body);
    const { id, newprice, userId } =
      req.body;
    // const { photo } = req.files;
    //alidation
    switch (true) {
      case !id:
        return res.status(500).send({ error: "ProductId is Required" });
      case !newprice:
        return res.status(500).send({ error: "newprice is Required" });
      case !userId:
        return res.status(500).send({ error: "userId is Required" });
    }

    // const prices = new priceModel({ ...req.fields });
    const prices = new priceModel({ 
        productId: id,
        newprice: newprice,
        userId: userId,
     });
    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }
    await prices.save();
    res.status(201).send({
      success: true,
      message: "Price Created Successfully",
      prices,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing price",
    });
  }
};


// get single price by id 
export const getSinglePriceId = async (req, res) => {
  try {
    // console.log(req.params.id);
    console.log("inside get single price id");
    console.log(req.body);
    // console.log(req.body.id);
    // console.log(req.body.userId);
    const {id, userId} = req.body;
    const price = await priceModel
      .find( {"productId": id, "userId": userId })
     
    console.log(price);
    res.status(200).send({
      success: true,
      message: "Single Price Fetched",
      price,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single price",
      error,
    });
  }
};


//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate product
export const updateProductController = async (req, res) => {
  try {
    console.log(req.fields);
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    console.log("before calling func");
    // if(myfunc(products)){
    //   console.log("Price success");
    // }
    // else{
    //   console.log("Price fail");
    // }

    console.log("Inside func");
    const allprice = await priceModel.find({"productId": products._id});
    const oldprice = products.price;
    const alluser = [];
    for(var i=0; i<allprice.length; i++)
    {
      if(allprice[i].newprice >= oldprice)
      {
        alluser.push(allprice[i].userId);
      }
    }
    console.log(alluser);

    console.log("after calling func");

    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};


//get all products
// export const getProductController = async (req, res) => {
//   try {
//     const products = await productModel
//       .find({})
//       .populate("category")
//       .select("-photo")
//       .limit(12)
//       .sort({ createdAt: -1 });
//     res.status(200).send({
//       success: true,
//       counTotal: products.length,
//       message: "ALlProducts ",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr in getting products",
//       error: error.message,
//     });
//   }
// };

// get single product
// export const getSingleProductController = async (req, res) => {
//   try {
//     const product = await productModel
//       .findOne({ slug: req.params.slug })
//       .select("-photo")
//       .populate("category");
//     res.status(200).send({
//       success: true,
//       message: "Single Product Fetched",
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Eror while getitng single product",
//       error,
//     });
//   }
// };


//  const myfunc = (products)=>{
//   try {
//     console.log("Inside func");
//     const allprice = priceModel.find({"productId": products._id});
//     const oldprice = products.price;
//     const alluser = [];
//     for(var i=0; i<allprice.length; i++)
//     {
//       if(allprice[i].newprice >= oldprice)
//       {
//         alluser.push(allprice[i].userId);
//       }
//     }
//     console.log(alluser);
//     return true;
//   } catch (error) {
//     console.log(error); 
//     return false;
//   }
//  }
