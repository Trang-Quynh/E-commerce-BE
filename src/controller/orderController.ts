import {Request, Response} from "express";
import orderService from "../service/orderService";
import orderDetailService from "../service/orderDetailService";
import productService from "../service/productService";


class orderController{
    private orderService;
    private orderDetailService;
    private productService;
    constructor() {
        this.orderService = orderService;
        this.orderDetailService = orderDetailService;
        this.productService = productService;
    }

    getOrder = async (req:Request,res:Response) => {
        try {
            let userId = req['decode'].id;
            let foundOrder = await this.orderService.getOrderService(userId);
            res.status(201).json({
                success : true,
                message: 'get order successfully',
                data : foundOrder
            })
        }catch (error){
            res.status(500).json(
                {
                    message: 'error at get order',
                    error : error,
                    success : false
                }
            )
        }
    }


    getTotalMoney = async (orderDetails)=>{
        let totalMoney = 0
        for await (let orderDetail of orderDetails) {
            let price = orderDetail.price;
            let quantity = orderDetail.quantity;
            totalMoney += price * quantity;
        }
        return totalMoney
    }

    updateProductQuantity = async (check, productId, oldProduct)=>{
        if(check){
            await productService.updateProductQuantityService(productId, parseInt(oldProduct.quantity) - 1);
        }else{
            await productService.updateProductQuantityService(productId,  parseInt(oldProduct.quantity)+ 1);
        }
    }

    updateTotalMoney = async(orderId)=>{
        let orderDetails = await this.orderDetailService.getOrderDetailsByOrderId(orderId);
        let totalMoney = await this.getTotalMoney(orderDetails)
        await this.orderService.updateOrderTotalMoney(orderId, totalMoney);
    }




    changeOrderDetailQuantity = async (req: Request, res: Response) => {
        try {
            let userId = req['decode'].id;
            let orderId = req.params.orderId;
            let orderDetailId = req.params.orderDetailId;
            let price = req.body.price;
            let updateQuantity = req.body.quantity;
            let productId = req.body.productId;
            let oldOrderDetail = await this.orderDetailService.getOrderDetailByIdService(orderDetailId);
            let oldQuantity = oldOrderDetail.quantity;
            let oldProduct = await this.productService.getOneProductById(productId);

            let check = oldQuantity<updateQuantity;
            await this.updateProductQuantity(check, productId, oldProduct)
            await this.orderDetailService.updateOrderDetailByIdService(orderDetailId, updateQuantity, price);


            await this.updateTotalMoney(orderId)

            let foundOrder = await this.orderService.getOrderService(userId);
            res.status(201).json({
                success : true,
                message: 'change order quantity successfully',
                data : foundOrder
            })
        } catch (error) {
            res.status(500).json(
                {
                    message: 'at change order quantity',
                    error : error,
                    success : false
                })
        }
    }



    changeOrderDetailQuantityByInput = async (req: Request, res: Response) => {
        try {
            let userId = req['decode'].id;
            let orderDetailId = req.params.orderDetailId;
            let orderId = req.params.orderId;
            let {quantity, productId, price} = req.body
            let oldOrderDetail = await this.orderDetailService.getOrderDetailByIdService(orderDetailId);
            let oldProduct = await this.productService.getOneProductById(productId);
            let updateOrderDetailQuantity = quantity - oldOrderDetail.quantity;
            let updateProductQuantity = oldProduct.quantity - updateOrderDetailQuantity;


            await this.orderDetailService.updateOrderDetailByIdService(orderDetailId, quantity, price);
            await this.productService.updateProductQuantityService(productId, updateProductQuantity);

            await this.updateTotalMoney(orderId);

            let foundOrder = await this.orderService.getOrderService(userId);
            res.status(201).json({
                success : true,
                message: 'change order quantity successfully',
                data : foundOrder
            })
        } catch (error) {
            res.status(500).json(
                {
                    message: 'at change order quantity by input',
                    error : error,
                    success : false
                })
        }
    }




    deleteOrderDetail = async (req: Request, res: Response) => {
        try {
            let userId = req['decode'].id;
            let orderDetailId = req.params.id;
            let {productId} = req.body
           //Update product quantity
            let orderDetail = await this.orderDetailService.getOrderDetailByIdService(orderDetailId);
            let orderDetailQuantity = orderDetail.quantity;
            let oldProduct = await this.productService.getOneProductById(productId);
            let updateProductQuantity = parseInt(oldProduct.quantity) + parseInt(orderDetailQuantity);

            await this.productService.updateProductQuantityService(productId, updateProductQuantity);

            //Update total money of order
            let totalPrice = orderDetail.price * orderDetail.quantity;
            let foundOrder = await this.orderService.getOrderService(userId);
            let totalMoney = foundOrder.totalMoney;
            let updateTotalMoney = totalMoney - totalPrice;
            await this.orderService.updateOrderTotalMoney(foundOrder.id, updateTotalMoney);

            //Delete orderDetail
            await this.orderDetailService.deleteOrderDetailService(orderDetailId);

            //Find and return update order
            let foundUpdatedOrder = await this.orderService.getOrderService(userId);
            res.status(201).json({
                success : true,
                message: 'delete order successfully',
                data : foundUpdatedOrder
            })
        } catch (error) {
            res.status(500).json(
                res.status(500).json(
                    {
                        message: 'at delete order detail',
                        error : error,
                        success : false
                    })
            );
        }
    }


    checkOut = async (req:Request,res:Response) => {
        try {
            let userId = req['decode'].id;

            res.status(201).json({
                success : true,
                message: 'get order successfully',

            })
        }catch (error){
            res.status(500).json(
                {
                    message: 'error at get checkout',
                    error : error,
                    success : false
                }
            )
        }
    }











    checkout = async (req:Request,res:Response) => {
        try {
            let userId = req['decode'].id;
            let foundOrder = await this.orderService.getOrderService(userId);
            let orderDetailStatusFalse = await this.orderDetailService.findOrderDetailStatus(foundOrder.id, false)
            let newOrder = await this.orderService.createNewOrder(userId);
            for await (const orderDetail of orderDetailStatusFalse){
               await this.orderDetailService.update({id: orderDetail.id}, {order:newOrder.id})
            }
            await this.orderService.updateOrderStatus(foundOrder.id, 'paid');
            res.status(201).json({
                success : true,
                message: 'checkout successfully',
            })
        }catch (error){
            res.status(500).json(
                {
                    message: 'error at checkout',
                    error : error,
                    success : false
                }
            )
        }
    }








}
export default new orderController()