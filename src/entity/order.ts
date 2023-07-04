import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OrderDetail} from "./orderDetail";
import {User} from "./user";


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ default: "unpaid" })
    status: string;
    @Column({ default: 0 })
    totalMoney: number;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public date: Date;
    @OneToMany(() => OrderDetail,(orderDetail) => orderDetail.order)
    orderDetails: OrderDetail[];
    @ManyToOne(() => User,(user) => user.orders)
    user: User;
}