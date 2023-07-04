import {Router} from "express";
import {auth} from "../middleware/auth";
import orderController from "../controller/orderController";

export const orderRouter = Router();
orderRouter.use(auth)
orderRouter.get('/', orderController.getOrder);
orderRouter.put('/:orderId/orderDetail/:orderDetailId', orderController.changeOrderDetailQuantity);
orderRouter.put('/:orderId/orderDetail-input/:orderDetailId', orderController.changeOrderDetailQuantityByInput);
orderRouter.delete('/orderDetail/:id', orderController.deleteOrderDetail);
orderRouter.delete('/checkout', orderController.checkOut);












