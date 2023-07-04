import {Router} from "express";
import {auth} from "../middleware/auth";
import {staffAuth} from "../middleware/staffAuth";
import StaffController from "../controller/staffController";

export const staffRouter = Router();

// staffRouter.use(auth);
// staffRouter.use(staffAuth);
staffRouter.get('/search/Staff', StaffController.searchStaff);
staffRouter.get('/search/User', StaffController.staffSearchUser);
staffRouter.get("/find-staff/:id",StaffController.findStaffById)
// staffRouter.post('/updateAccount/', StaffController.staffUpdateInfo);