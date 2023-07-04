import {Request, Response} from "express";
import StaffService from "../service/staffService";
import orderService from "../service/orderService";

class StaffController {
    private StaffService;
    private orderService;

    constructor() {
        this.StaffService = StaffService;
        this.orderService = orderService;
    }

    // Await check to find all user
    searchAll = async (req: Request, res: Response) => {
        try {
            let userID = req.query.userID;
            let searchStatus = await this.StaffService.searchStaffByID(userID);
            res.status(202).json(searchStatus);
        } catch (error) {
            res.status(500).json(error + ' at searchStaff in staffController');
        }
    }

    // Await check to find staff
    searchStaff = async (req: Request, res: Response) => {
        try {
            let userID = req.query.userID;
            let searchStatus = await this.StaffService.searchStaffByID(userID);
            res.status(202).json(searchStatus);
        } catch (error) {
            res.status(500).json(error + ' at searchStaff in staffController');
        }
    }

    deleteStaffById = async (req: Request, res: Response) => {
        try {
            let id = parseInt(req.params.id);
           let order = await this.orderService.findOrderByUserId(id);
           const orderId = order.id;
            await this.orderService.deleteOrderByUserId(orderId);
            await this.StaffService.deleteStaff(id)
            res.status(200).json({
                success: true,
                message: "Employee information has been successfully deleted"
            })
        } catch (error) {
            res.status(500).json({
                message: "error at deleteStaffById",
                success: false,
                error: error
            })
        }
    }

    // Await check to find user
    staffSearchUser = async (req: Request, res: Response) => {
        try {
            let userID = req.query.userID;
            let searchStatus = await this.StaffService.searchUserByID(userID);
            res.status(202).json(searchStatus);
        } catch (error) {
            res.status(500).json(error + ' at searchUser in staffController');
        }
    }

    // Await to update staff's information
    staffUpdateInfo = async (req: Request, res: Response) => {
        try {
            let userID = req['decode'].idUser;
            if (await this.StaffService.searchStaffByID(userID).length !== 0) {
                await this.StaffService.staffUpdate(req.body);
                res.status(202).json('Staff info successfully updated!');
            } else {
                res.status(202).json('Staff doesnt exists');
            }
        } catch (error) {
            res.status(500).json(error + ' at staffUpdateInfo in staffController');
        }
    }

    findStaffById = async (req: Request, res: Response) => {
        let idStaff = req.params.id
        try {
            let staff =  await this.StaffService.searchStaffById(idStaff)

            res.status(200).json({
                data: staff[0],
                success: true,
                message: "oke"
            })

        } catch (error){
            res.status(500).json({
                message: "error at deleteStaffById",
                success: false,
                error: error
            })
        }
    }
}

export default new StaffController();