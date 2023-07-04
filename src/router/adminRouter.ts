import {Router} from 'express'
import {auth} from "../middleware/auth";
import {adminAuth} from "../middleware/adminAuth";
import AdminController from "../controller/adminController";
import StaffController from "../controller/staffController";

export const adminRouter = Router()

// adminRouter.use(auth)
// adminRouter.use(adminAuth)
//Router for Admin Specific Function. Modified to add more feature as more sprint progress

adminRouter.post('/createAccount/', AdminController.createStaff);
adminRouter.get('/showAccount/', AdminController.showAllAccount);
adminRouter.get('/searchAccount/', AdminController.searchAccount);
adminRouter.post('/enablingAccount/', AdminController.enablingShopAccount);
adminRouter.get('/get-staffs',AdminController.showAllStaffs);
adminRouter.post('/add-staff',AdminController.addStaff);
adminRouter.get('/pagination-staffs/',AdminController.PaginationStaff)
adminRouter.delete('/delete-staff/:id',StaffController.deleteStaffById)
adminRouter.put('/edit-staff/:id',AdminController.editStaffById)


