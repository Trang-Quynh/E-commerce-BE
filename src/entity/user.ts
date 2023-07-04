import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from "./order";
import {Store} from "./store";

@Entity()
//Some attributes can't be empty and can only exist once. Use Unique and Nullable
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", unique: true})
    username: string;
    @Column({type: "varchar", unique: true})
    email: string;
    @Column({type: "varchar", default: '123456@Abc'})
    password: string;
    @Column({type: "varchar", default: 'user'})
    role: string;
    @Column({type: "varchar",nullable: true})
    name: string;
    @Column({type: "varchar",nullable: true})
    age: number;
    @Column({type: "varchar", nullable: true})
    phoneNumber: string;
    @Column({type: "varchar", nullable: true})
    address: string;
    @Column({type: "varchar", nullable: true})
    salary: number;
    @Column({type:"longtext", nullable: true})
    image: string;
    @OneToMany(() => Order,(order)  => order.user)
    orders: Order[];
    @OneToOne(() => Store, (store) => store.user)
    @JoinColumn()
    store: Store;
}
