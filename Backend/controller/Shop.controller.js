import { Shop } from "../model/shop.model.js";
import uploadCloudinary from "../utills/cloudinary.js";

// CREATE or EDIT shop
// export const createEditShop = async (req, res) => {
//   try {
//     const { name, city, state, address } = req.body;

//     if (!name || !city || !state || !address) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // ✅ SAFE owner id
//     const ownerId = req.user._id;

//     let imageUrl;

//     // ✅ upload image only if file exists
//     if (req.file) {
//       const uploadRes = await uploadCloudinary(req.file.path);
//       imageUrl = uploadRes.secure_url; // ✅ use secure_url
//     }

//     let shop = await Shop.findOne({ owner: ownerId });

//     if (!shop) {
//       // CREATE
//       shop = await Shop.create({
//         name,
//         city,
//         state,
//         address,
//         image: imageUrl,
//         owner: ownerId,
//       });
//     } else {
//       // EDIT
//       shop.name = name;
//       shop.city = city;
//       shop.state = state;
//       shop.address = address;

//       if (imageUrl) {
//         shop.image = imageUrl; // ✅ update image only if new one exists
//       }

//       await shop.save();
//     }

//     await shop.populate("owner");

//     return res.status(200).json(shop);
//   } catch (error) {
//     console.error("createEditShop error:", error);
//     return res.status(500).json({
//       message: "Shop create/update failed",
//       error: error.message,
//     });
//   }
// };
export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;

    if (!name || !city || !state || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ownerId = req.user._id;
    let shop = await Shop.findOne({ owner: ownerId });

    let imageUrl;

    // upload image if new file exists
   if (req.file) {
  console.log("FILE RECEIVED 👉", req.file.path);
  imageUrl = await uploadCloudinary(req.file.path);
}


    // 🔴 CREATE MODE
    if (!shop) {
      if (!imageUrl) {
        return res.status(400).json({
          message: "Image is required to create shop",
        });
      }

      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image: imageUrl,
        owner: ownerId,
      });
    }

    // 🟢 EDIT MODE
    else {
      shop.name = name;
      shop.city = city;
      shop.state = state;
      shop.address = address;

      if (imageUrl) {
        shop.image = imageUrl;
      }

      await shop.save();
    }

    await shop.populate("owner items");
    return res.status(200).json(shop);

  } catch (error) {
    console.error("createEditShop error:", error);
    return res.status(500).json({
      message: "Shop create/update failed",
      error: error.message,
    });
  }
};


// GET my shop
export const getmyShop = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const shop = await Shop.findOne({ owner: ownerId }).populate([
      { path: "owner" },
      { path: "items" },
    ]);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.status(200).json(shop);
  } catch (error) {
    console.error("getmyShop error:", error);
    return res.status(500).json({
      message: "Get my shop failed",
      error: error.message,
    });
  }
};
export const getShopByCity = async (req, res) => {
  try {
    console.log("CITY PARAM:", req.params); // 🔥 ADD

    const { city } = req.params;

    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") }
    }).populate({
  path: "items",
  model: "Item"
})
 // ⚠️ likely crash point

    console.log("SHOPS FOUND:", shops); // 🔥 ADD

    if (!shops || shops.length === 0) {
      return res.status(404).json({ message: "shops not found" });
    }

    return res.status(200).json(shops);

  } catch (error) {
    console.error("GET SHOP BY CITY ERROR:", error); // 🔥 MUST SEE
    return res.status(500).json({ message: "get shop by city error" });
  }
};

