import {Request, Response} from 'express';
import orderService from "../service/orderService";
import orderDetailService from "../service/orderDetailService";



class ClientController {
    constructor() {
    }

    buyProduct = async (req: Request, res: Response) => {
        try {
            let userId = req['decode'].id;
            let order = await orderService.findOrderByUserId(userId);
            let orderId = order.id;
            let product = req.body;
            await orderDetailService.addOrderDetail(orderId, product);
            let orderDetails = await orderDetailService.findOrderDetails(orderId)
            res.status(200).json(orderDetails)
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error,
                message: "error in buyProduct"
            })
        }
        }

}

export default new ClientController();