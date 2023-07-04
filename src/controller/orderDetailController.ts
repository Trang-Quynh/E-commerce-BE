import {Request, Response} from "express";
import orderDetailService from "../service/orderDetailService";
import orderService from "../service/orderService";


class orderDetailController {
    private orderDetailService;

    constructor() {

        this.orderDetailService = orderDetailService;

    }

    getOrderDetails = async (req: Request, res: Response) => {
        try {
            let userId = req['decode'].id;
            let order = await orderService.findOrderByUserId(userId);
            let orderId = order.id;
            res.status(201).json(await orderDetailService.findOrderDetails(orderId))
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    getOrderDetailStatusTrue = async (req: Request, res: Response) => {
        try {
            let userId = req['decode'].id;
            let order = await orderService.findOrderByUserId(userId);
            let orderId = order.id;
            res.status(201).json(await orderDetailService.findOrderDetailStatusTrue(orderId))
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    getOrderDetailPending = async (req: Request, res: Response) => {
        try {
            const userId = req['decode'].id;
            const order = await orderService.findOrderByUserId(userId);
            const orderId = order.id;

            // await orderDetailService.changeStatusBill(orderId);

            res.status(201).json(await orderDetailService.findOrderDetailPending(userId))
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    sendOrderDetailPending = async (req: Request, res: Response) => {
        try {
            const userId = req['decode'].id;
            await orderDetailService.saveOrderDetailPending(userId);
            res.status(201).json("ok")
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    getOrderDetailSuccess = async (req: Request, res: Response) => {
        try {
            const userId = req['decode'].id;
            // const order = await orderService.findOrderByUserId(userId);
            // const orderId = order.id;
            const orderDetails = await orderDetailService.findOrderDetailSuccess(userId)
            res.status(201).json(orderDetails)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    getOrderDetailPendingReceipt = async (req: Request, res: Response) => {
        try {
            const storeId = req.body.data;
            console.log("get pending receipt of store:", storeId)
            res.status(201).json(await orderDetailService.findOrderDetailPendingReceipt(storeId));
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    getOrderDetailConfirmedReceipt = async (req: Request, res: Response) => {
        try {
            const storeId = req.params.id;
            let orderDetails = await orderDetailService.findOrderDetailConfirmedReceipt(storeId);
            res.status(201).json(orderDetails)
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    updateOrderDetailPendingReceipt = async (req: Request, res: Response) => {
        try {
            console.log("orderDetail to comfirm:", req.body['orderDetail'])
            await orderDetailService.updateOrderDetailPendingReceipt(req.body['orderDetail'])
            res.status(201).json("ok")
        } catch (error) {
            console.log("error in update pending:", error)
            res.status(500).json(error.message)
        }
    }

}

export default new orderDetailController();

