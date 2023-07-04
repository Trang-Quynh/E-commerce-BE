import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from "./product";


@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("longtext")
    url: string;
    @ManyToOne(() => Product,(product) => product.images)
    product: Product;
}