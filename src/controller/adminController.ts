import {Request, Response} from 'express'
import adminService from "../service/adminService"
import staffService from "../service/staffService";
import orderService from "../service/orderService";

class AdminController {
    private adminService;
    private staffService;
    private orderService;

    constructor() {
        this.adminService = adminService;
        this.staffService = staffService;
        this.orderService = orderService;

    }

    createStaff = async (req: Request, res: Response) => {
        try {
            let userCheck = await this.adminService.checkUser(req.body);
            if (userCheck.length !== 0) {
                await res.status(406).json('The username already existed!');
            } else {
                await this.adminService.createStaff(req.body);
                await res.status(201).json('Create new user successfully!');
            }
        } catch (error) {
            await res.status(500).json(error + ' at createAccount in adminController');
        }
    }

    // Await Update For Display All User's Detail
    // Await Response For Found Entity
    searchAccount = async (req: Request, res: Response) => {
        try {
            let userFound = await this.adminService.searchUser(req.query);
            await res.status(202).json(userFound);
        } catch (error) {
            await res.status(500).json(error + ' at searchAccount in adminController');
        }
    }

    enablingShopAccount = async (req: Request, res: Response) => {
        try {
            let shopStatus = await this.adminService.enablingShop(req.body);
            await res.status(201).json(shopStatus);
        } catch (error) {
            await res.status(500).json(error + ' at enablingShopAccount in adminController');
        }
    }

    showAllAccount = async (req: Request, res: Response) => {
        try {
            let allAccount = await this.adminService.showUser();
            await res.status(202).json(allAccount);
        } catch (error) {
            await res.status(500).json(
                error + ' at showAllAccount in adminController');
        }
    }

    showAllStaffs = async (req: Request, res: Response) => {
        try {
            let staffs = await this.staffService.getStaffs();
            res.status(202).json({
                success : true,
                message: 'oke',
                data : staffs
            })
        } catch (error) {
            res.status(500).json(
                {
                    message: 'error in showAllStaff',
                    error : error,
                    success : false
                }
            )
        }
    }

    addStaff = async (req: Request, res: Response) => {
        let staff = req.body;
        console.log(staff)
        try {
            let message = await this.staffService.checkStaff(staff);
            if(!message){
                await this.staffService.addStaffs(staff).then((staff) =>{
                    console.log('create account success');
                    this.orderService.createNewOrder(staff);
                });

                res.status(200).json({
                    success: true,
                    data: staff.id
                })
            } else {
                res.status(200).json({
                    success: false,
                    data: message
                })
            }
        } catch (error) {
            res.status(500).json({
                error: error,
                success: false,
                message: 'Error in creating Staff'
            })
        }
    }

    PaginationStaff = async (req: Request, res: Response) => {
        try {
            let page = req.query.page
            let page_size = req.query.page_size
            if(page){
                let data = await this.staffService.paginationStaff(page,page_size)
                res.status(200).json({
                    message: "oke",
                    success: true,
                    data: data
                })
            }else {
                let data = await this.staffService.getStaffs();
                res.status(200).json({
                    message: "oke",
                    success: true,
                    data: data
                })
            }

        } catch (error) {
            res.status(500).json(
                {
                    message: "error at PaginationStaff",
                    success: false,
                    error: error
                }
            )
        }
    }
    editStaffById = async (req:Request,res:Response) => {
        let id = req.params.id
        let staff = req.body
        try {
           let idStaff = await this.staffService.staffUpdateById(id,staff)
            res.status(200).json({
                success:true,
                message:"oke",
                data: idStaff
            })

        } catch (error) {
            res.status(500).json(
                {
                    message: "error at PaginationStaff",
                    success: false,
                    error: error
                }
            )
        }
    }

}

export default new AdminController();

