import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

import { createPriceController, deletePriceController, getSinglePriceId, updatePriceController } from "../controllers/priceController.js";

const router = express.Router();

//routes
router.post(
  "/create-price",
//   requireSignIn,
//   formidable(),
  createPriceController
);

//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  // isAdmin,
  // formidable(),
  updatePriceController
);

// //get prices
// router.get("/get-product", getSinglePriceId);

// //single price
// router.get("/get-product/:slug", getSinglePriceId); 

//single price by id
router.get("/get-productpricebyid", getSinglePriceId); 


//delete rproduct
router.delete("/delete-product/:pid", deletePriceController);

export default router;
