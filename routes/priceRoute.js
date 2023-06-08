import express from "express";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { createPriceController } from "../controllers/priceController.js";

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

// //single product by id
// router.get("/get-productbyid/:id", getSingleProductByIdController); 

// //get photo
// router.get("/product-photo/:pid", productPhotoController);

// //delete rproduct
// router.delete("/delete-product/:pid", deleteProductController);

// //filter product
// router.post("/product-filters", productFiltersController);

// //product count
// router.get("/product-count", productCountController);

// //product per page
// router.get("/product-list/:page", productListController);

// //search product
// router.get("/search/:keyword", searchProductController);

// //similar product
// router.get("/related-product/:pid/:cid", realtedProductController);

// //category wise product
// router.get("/product-category/:slug", productCategoryController);

// //payments routes
// //token
// // router.get("/braintree/token", braintreeTokenController);

// //payments
// // router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
// router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
