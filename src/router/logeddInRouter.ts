import {Router} from "express";
import {auth} from "../middleware/auth";
import userController from "../controller/userController";


export const loggedInRouter = Router();
loggedInRouter.use(auth)
loggedInRouter.put('/update-account',userController.updateAccount);



