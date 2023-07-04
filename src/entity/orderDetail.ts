import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "./order";
import {Product} from "./product";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({default:false})
    status: boolean;
    @Column()
    price: number;
    @Column()
    quantity: number;
    @Column()
    totalPrice: number;
    @Column({default:"unpaid"})
    statusBill: string;
    @ManyToOne(() => Order,(order) => order.orderDetails)
    order: Order;
    @ManyToOne(() => Product,(product) => product.orderDetails)
    product: Product;
}