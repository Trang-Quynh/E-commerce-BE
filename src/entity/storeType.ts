import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Store} from "./store";

@Entity()
export class StoreType {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar"})
    name: string;
    @OneToMany (() => Store, (store) => store.storeType)
    store: Store[]
}