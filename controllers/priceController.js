import priceModel from "../models/priceModel.js";
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

    const prices = new priceModel({ 
        productId: id,
        newprice: newprice,
        userId: userId,
     });
    
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
export const deletePriceController = async (req, res) => {
  try {
    await priceModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Price Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting price",
      error,
    });
  }
};

//update price
export const updatePriceController = async (req, res) => {
  try {
    console.log(req.fields);
    const { newprice } = req.fields;
    
      if(!newprice)
        return res.status(500).send({ error: "Quantity is Required" });
     
    const price = await priceModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields },
      { new: true }
    );
    
    await price.save();
   
    res.status(201).send({
      success: true,
      message: "Price Updated Successfully",
      price,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte price",
    });
  }
};


