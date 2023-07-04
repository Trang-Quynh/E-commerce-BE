import {AppDataSource} from "../data-source";
import {Order} from "../entity/order";


class orderService {
    private orderRepository;

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order);
    }

    createNewOrder = async (user) => {
        let order = {
            status: "unpaid",
            totalMoney: 0,
            user: user,
            orderDetails: []
        }
        return await this.orderRepository.save(order)
    }
    findOrderByUserId = async (userId) => {
        return await this.orderRepository.findOne({
            where: {
                user: {
                    id: userId
                },
                status: 'unpaid'
            },
            relations:
                {
                    user: true
                }
        })
    }

    getOrderService = async (userId) => {
        try {
            let foundOrder = await this.orderRepository.findOne({
                relations: ['orderDetails', 'orderDetails.product', 'orderDetails.product.category'],
                where: {
                    user: {
                        id: userId
                    },
                    status: 'unpaid'
                }
            })
            return foundOrder;
        } catch (error) {
            console.log(error + 'at find Order service')
        }
    }

    updateOrderTotalMoney = async (orderId, totalMoney) => {
        try {
            await this.orderRepository.update({id: orderId}, {totalMoney: totalMoney})
        } catch (error) {
            console.log(error + 'at update total money of order service')
        }
    }
    deleteOrderByUserId = async (orderId) => {
        try {
            await this.orderRepository.delete({id: orderId})
        } catch (error) {
            console.log(error)
        }
    }

    sendPending = async (orderId) => {
        await this.orderRepository.update({
                id: orderId
            },
            {
                status: 'pending'
            })
    }
}

export default new orderService();