import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

import { createPriceController, getSinglePriceId } from "../controllers/priceController.js";

const router = express.Router();

//routes
router.post(
  "/create-price",
//   requireSignIn,
//   formidable(),
  createPriceController
);

// //routes
// router.put(
//   "/update-product/:pid",
//   requireSignIn,
//   isAdmin,
//   formidable(),
//   updateProductController
// );

// //get products
// router.get("/get-product", getProductController);

// //single product
// router.get("/get-product/:slug", getSingleProductController); 

//single product-price by id
router.get("/get-productpricebyid", getSinglePriceId); 


// //delete rproduct
// router.delete("/delete-product/:pid", deleteProductController);

export default router;
