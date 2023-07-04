import {Router} from "express";
import {auth} from "../middleware/auth";
import SellerController from "../controller/sellerController";
import {sellerAuth} from "../middleware/sellerAuth";

export const sellerRouter = Router();

sellerRouter.use(auth);
sellerRouter.use(sellerAuth);
sellerRouter.post('/createProduct', SellerController.createProduct);
sellerRouter.put('/editProduct/:id', SellerController.editProduct);
sellerRouter.get('/search/productName', SellerController.searchProduct);

// sellerRouter.get('/search/:id', SellerController.findStore);
