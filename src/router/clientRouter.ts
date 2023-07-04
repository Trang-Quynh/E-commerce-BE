import {Router} from "express";
import clientController from "../controller/clientController";
import {auth} from "../middleware/auth";
import {userAuth} from "../middleware/userAuth";
import orderDetailController from "../controller/orderDetailController";



export const clientRouter = Router();
clientRouter.use(auth);
clientRouter.use(userAuth);
clientRouter.post('/buy-product',clientController.buyProduct);
clientRouter.get('/success',orderDetailController.getOrderDetailSuccess);