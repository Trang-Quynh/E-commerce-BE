import {Router} from "express";
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/adminAuth";
import {staffAuth} from "../middleware/staffAuth";
import {userAuth} from "../middleware/userAuth";
import categoryController from "../controller/categoryController";

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategory);
categoryRouter.get('/search/ID', categoryController.searchCategoryWithID);





export default categoryRouter