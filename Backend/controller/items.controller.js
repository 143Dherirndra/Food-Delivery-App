import uploadCloudinary from "../utills/cloudinary.js";

import { Shop } from "../model/shop.model.js";


/* ===================== ADD ITEM ===================== */
export const addItems = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const image = await uploadCloudinary(req.file.path);

    const shopData = await Shop.findOne({ owner: req.userId });
    if (!shopData) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const item = await Item.create({
      name,
      category,
      foodType,
      price,
      image,
      shop: shopData._id,
    });

    shopData.items.push(item._id);
    await shopData.save();

    return res.status(201).json({
      success: true,
      message: "Item added successfully",
      item,
    });
  } catch (error) {
    console.error("ADD ITEM ERROR:", error);
    res.status(500).json({ message: "Add item error" });
  }
};

/* ===================== EDIT ITEM ===================== */
export const editItems = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, foodType, price } = req.body;

    let updateData = { name, category, foodType, price };

    if (req.file) {
      const image = await uploadCloudinary(req.file.path);
      updateData.image = image;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    const shop= await Shop.findOne({owner:req.userId}).populate("items")
    return res.status(200).json(shop)
    return res.status(200).json(updatedItem);

  } catch (error) {
    console.error("EDIT ITEM ERROR:", error);
    res.status(500).json({ message: "Edit item error" });
  }
};

/* ===================== GET ITEM BY ID ===================== */
import mongoose from "mongoose";
import { Item } from "../model/item.model.js";


export const getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("GET ITEM ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteItems = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }

    const shop = await Shop.findOne({ owner: req.userId });
    shop.items = shop.items.filter(
      (id) => id.toString() !== itemId
    );

    await shop.save();
    await shop.populate("items");

    return res.status(200).json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "delete items error" });
  }
};


export const getItemByCity = async (req, res) => {
  try {
    const { city } = req.params;

    // ✅ Validate city
    if (!city) {
      return res.status(400).json({ message: "city is required" });
    }

    // ✅ Find shops in city
    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") }
    });

    if (!shops || shops.length === 0) {
      return res.status(404).json({ message: "shops not found" });
    }

    // ✅ Extract shop IDs
    const shopIds = shops.map((shop) => shop._id);

    // ✅ Find items belonging to those shops
    const items = await Item.find({
      shop: { $in: shopIds }
    }).populate("shop"); // optional

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "items not found" });
    }

    return res.status(200).json(items);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "get items by city error",
      error: error.message,
    });
  }
};
