import {AppDataSource} from "../data-source";
import {OrderDetail} from "../entity/orderDetail";
import orderService from "./orderService";
import userService from "./userService";


class orderDetailService {
    private orderDetailRepository;

    constructor() {
        this.orderDetailRepository = AppDataSource.getRepository(OrderDetail);
    }

    addOrderDetail = async (orderId, product) => {
        let existOrderDetails = await this.orderDetailRepository.find({
            where: {
                order: {
                    id: orderId
                },
                product: {
                    id: product.id
                }
            },
        });


        if (existOrderDetails[0]) {
            await this.orderDetailRepository
                .createQueryBuilder()
                .update(OrderDetail)
                .set({
                    price: product.price,
                    quantity: existOrderDetails[0].quantity + product.quantity,
                    totalPrice: product.price * (existOrderDetails[0].quantity + product.quantity),
                    order: orderId,
                    product: product.id,
                    status: product.status
                })
                .where({order: orderId, product: product.id})
                .execute()
        } else {
            let newOrderDetail = {
                price: product.price,
                quantity: product.quantity,
                totalPrice: product.price * product.quantity,
                order: orderId,
                product: product.id,
                status: product.status
            }
            await this.orderDetailRepository.save(newOrderDetail);
        }
    }
    findOrderDetails = async (orderId) => {
        return await this.orderDetailRepository.find({
            relations: [
                'order', 'product', 'product.category'
            ],
            where: {
                order: {
                    id: orderId,
                    status: "unpaid"
                },
            },
        })
    }
    findOrderDetailStatusTrue = async (orderId) => {
        return await this.orderDetailRepository.find({
            relations: [
                'order', 'product', 'product.category'
            ],
            where: {
                status: true,
                order: {
                    id: orderId,
                    status: "unpaid"
                },
            },
        })
    }
    findOrderDetailPending = async (userId) => {
        return await this.orderDetailRepository.find({
            relations: [
                'order', 'product', 'product.category', 'order.user'
            ],
            where: {
                statusBill: "pending",
                order: {
                    user: {
                        id: userId
                    }
                },
            },
        })
    }
    changeStatusBill = async (orderId) => {
        return await this.orderDetailRepository
            .createQueryBuilder()
            .update(OrderDetail)
            .set({
                statusBill: "pending"
            })
            .where({
                status: true,
                statusBill: "unpaid",
                order: {
                    id: orderId
                }
            })
            .execute()
    }
    findOrderDetailPendingReceipt = async (storeId) => {
        return await this.orderDetailRepository.find({
            relations: [
                'order', 'product', 'product.category', 'product.store', 'order.user'
            ],
            where: {
                status: true,
                statusBill: "pending",
                product: {
                    store: {
                        id: storeId
                    }
                }
            },
        })
    }
    findOrderDetailConfirmedReceipt = async (storeId) => {
        return await this.orderDetailRepository.find({
            relations: [
                'order', 'product', 'product.category', 'product.store', 'order.user'
            ],
            where: {
                status: true,
                statusBill: "paid",
                product: {
                    store: {
                        id: storeId
                    }
                }
            },
        })
    }
    updateOrderDetailPendingReceipt = async (orderDetailId) => {
        await this.orderDetailRepository.update({id: orderDetailId}, {statusBill: 'paid'})

        // return await this.orderDetailRepository
        //     .createQueryBuilder()
        //     .update(OrderDetail)
        //     .set({
        //         statusBill: "paid"
        //     })
        //     .where({
        //         status: true,
        //         statusBill: "pending",
        //         product: {
        //             id: productId,
        //         },
        //         order: {
        //             id: orderId
        //         }
        //     })
        //     .execute()
    }

    getOrderDetailByIdService = async (orderDetailId) => {
        try {
            let orderDetail = await this.orderDetailRepository.findOne({
                where: {
                    id: orderDetailId
                }
            });
            return orderDetail;
        } catch (error) {
            console.log(`Error at finding Order detail by id service: ${error}`);
        }
    };


    getOrderDetailsByOrderId = async (orderId) => {
        try {
            let orderDetails = await this.orderDetailRepository.find({
                relations: {
                    order: true
                },
                where: {
                    order: {
                        id: orderId
                    }
                }
            })
            return orderDetails;
        } catch (error) {
            console.log(error + 'at find OrderDetails service')
        }
    }

    updateOrderDetailByIdService = async (orderDetailId, updateQuantity, price) => {
        try {
            await this.orderDetailRepository.update({id: orderDetailId}, {
                quantity: updateQuantity,
                totalPrice: updateQuantity * price
            })
        } catch (error) {
            console.log(error + 'at update quantity of order detail service')
        }
    }


    deleteOrderDetailService = async (orderDetailId) => {
        try {
            await this.orderDetailRepository.delete({id: orderDetailId})
        } catch (error) {
            console.log(error + 'at delete order detail service')
        }
    }
    findOrderDetailSuccess = async (userId) => {

        return await this.orderDetailRepository.find({
            relations: [
                'order', 'product', 'product.category', 'order.user'
            ],
            where: {
                status: true,
                statusBill: "paid",
                order: {
                    user: {
                        id: userId
                    }
                },
            },
        })
    }
    saveOrderDetailPending = async (userId) => {
        const order = await orderService.findOrderByUserId(userId);
        await orderService.sendPending(order.id)
        const user = await userService.findOne(userId);
        await this.orderDetailRepository.update(
            {
                order: order.id,
                status: true
            },
            {statusBill: 'pending'}
        )

        const newOrder = await orderService.createNewOrder(user);
        await this.orderDetailRepository.update(
            {
                order: order.id,
                status: false
            },
            {order: newOrder}
        )
    }
}

export default new orderDetailService();