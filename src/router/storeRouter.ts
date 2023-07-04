import {Router} from "express";
import storeController from "../controller/storeController";
import {auth} from "../middleware/auth";
import {sellerAuth} from "../middleware/sellerAuth";
import {adminAuth} from "../middleware/adminAuth";
import {userAuth} from "../middleware/userAuth";

export const storeRouter = Router();

storeRouter.get('/search/ID', storeController.searchStoreWithID);
storeRouter.use(auth)
// storeRouter.use(userAuth)
storeRouter.get('/storeDetail', storeController.getStoreInformation);
storeRouter.get('/storeType', storeController.getStoreType);
storeRouter.put('/edit', storeController.updateStoreInformation)
storeRouter.post('/create', storeController.createStore);
storeRouter.get('/shop-product', storeController.shopProduct);
storeRouter.get('/show-shop', storeController.showAllStore);

