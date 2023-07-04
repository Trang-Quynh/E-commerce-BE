import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./user";
import {Product} from "./product";
import {StoreType} from "./storeType";

@Entity()
export class Store {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", unique: true})
    name: string;
    @Column({type: "longtext", nullable: true})
    avatar: string;
    @Column({type: "varchar", unique: true})
    email: string;
    @Column({type: "longtext"})
    origin: string;
    @Column({type: "varchar"})
    country: string;
    @Column({type: "varchar"})
    telephone: string;
    @Column({type: "longtext"})
    address: string;
    @Column({type: "varchar", default: "Inactive"})
    status: string;
    @OneToMany(() => Product,(product) => product.store)
    products: Product[];
    @OneToOne(() => User,(user) => user.store)
    user: User;
    @ManyToOne(() => StoreType,(storeType) => storeType.store)
    storeType: StoreType;
}