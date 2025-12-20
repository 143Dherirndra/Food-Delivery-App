import express from "express";

import { upload } from "../middleware/multer.js";
import isAuth from "../middleware/isAuth.js";
import { createEditShop, getmyShop, getShopByCity } from "../controller/Shop.controller.js";

export const shopRouter = express.Router();

shopRouter.post(
  "/create-edit",
 isAuth,
  upload.single("image"), // ✅ FIXED
  createEditShop
);

shopRouter.get("/get-my", isAuth,getmyShop );
shopRouter.get("/get-by-city/:city", isAuth,getShopByCity );


