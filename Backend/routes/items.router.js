import express from 'express'
import isAuth from '../middleware/isAuth.js';
import { upload } from '../middleware/multer.js';
import { addItems, deleteItems, editItems, getItemByCity, getItemById } from '../controller/items.controller.js';


const itemsRouter = express.Router();

itemsRouter.post('/add-items',isAuth,upload.single("image"), addItems);
itemsRouter.post('/edit-items/:itemId',isAuth,upload.single("image"), editItems);
itemsRouter.get('/get-by-id/:itemId',isAuth, getItemById);
itemsRouter.get('/delete/:itemId',isAuth,deleteItems );
itemsRouter.get('/get-by-city/:city',isAuth,getItemByCity );
export default itemsRouter;