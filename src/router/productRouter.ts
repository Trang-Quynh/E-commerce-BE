import {Router} from "express";
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/adminAuth";
import {staffAuth} from "../middleware/staffAuth";
import {userAuth} from "../middleware/userAuth";
import productController from "../controller/productController";

export const productRouter = Router();
productRouter.get("/",productController.getAllProduct)
productRouter.post("/store",productController.getAllProductByStoreId)
productRouter.get('/getOne/:id', productController.searchProductWithID);
productRouter.get('/search/productName', productController.searchProductByName);
productRouter.get('/search/productCategory', productController.searchProductWithCategory);
productRouter.get('/search/productPrice', productController.searchProductWithPrice);
productRouter.get('/product-detail/:id', productController.getProductDetail)
productRouter.get('/main-product',productController.getMainProduct)



