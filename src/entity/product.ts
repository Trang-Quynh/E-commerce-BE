import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Category} from './category';
import {OrderDetail} from "./orderDetail";
import {Image} from "./image";
import {Store} from "./store";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar"})
    name: string;
    @Column()
    price: number;
    @Column()
    quantity: number;
    @Column({type: "longtext", nullable: true})
    image: string;
    @Column({type: "text", nullable: true})
    description: string;
    @ManyToOne(() => Category,(category) => category.products)
    category: Category;
    @OneToMany( () => Image,(image) => image.product)
    images: Image[];
    @OneToMany( () => OrderDetail,(orderDetail) => orderDetail.product)
    orderDetails: OrderDetail[];
    @ManyToOne(() => Store,(store) => store.products)
    store: Store;
}