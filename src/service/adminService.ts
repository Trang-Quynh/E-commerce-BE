import {AppDataSource} from "../data-source";
import {Store} from "../entity/store";
import {User} from "../entity/user";
import bcrypt from 'bcrypt'
import {Like} from 'typeorm'

class AdminService {
    private storeRepository;
    private userRepository;

    constructor() {
        this.storeRepository = AppDataSource.getRepository(Store);
        this.userRepository = AppDataSource.getRepository(User);
    }

    // Conditional to create new account
    checkUser = async (user) => {
        try {
            let findName = await this.userRepository.find({
                where: [
                    {
                        username: user.username
                    },
                    {
                        name: user.name
                    }
                ]
            })
            return findName;
        } catch (error) {
            console.log(error + ' at checkUser in adminService');
        }
    }

    // Admin create new account
    createStaff = async (user) => {
        try {
            user.password = await bcrypt.hash(user.password, 10);
            user.role = 'staff';
            return this.userRepository.save(user);
        } catch (error) {
            console.log(error + ' at createUser in adminService');
        }
    }

    // Display all the user's information

    // Admin search account with the search query provided
    searchUser = async (user) => {
        try {
            let foundAccount = await this.userRepository.find({
                where: [
                    {
                        username: Like(`${user.username}%`), role: "staff"
                    },
                    {
                        name: Like(`${user.name}%`), role:"staff"
                    }
                ]
            })
            if (!foundAccount) {
                return 'There is no account that exists';
            } else {
                return foundAccount;
            }
        } catch (error) {
            console.log(error + 'at searchUser in adminService');
        }
    }

    // searchOneUserByID = async (userID) => {
    //     try {
    //         let foundAccount = await this.userRepository.findOne({
    //             where: {
    //                 id: userID
    //             }
    //         })
    //         if (!foundAccount) {
    //             return 'There is no account that exists';
    //         } else {
    //             return foundAccount;
    //         }
    //     } catch (error) {
    //         console.log(error + 'at searchUser in adminService');
    //     }
    // }


    searchOneUserByID = async (userID) => {
        try {
            let user = await this.userRepository.findOne({ relations: ['store', 'store.storeType'], where: { id: userID } });
            if (!user) {
                return 'There is no account that exists';
            } else {
                return user;
            }
        } catch (error) {
            console.log(error + 'at searchUser in adminService');
        }
    }




    enablingShop = async (shop) => {
        try {
            let foundAccount = await this.userRepository.find({
                relations: true,
                where: {
                    id: shop.userID
                }
            })

            if (!foundAccount) {
                return 'Store not found';
            } else {
                let storeID = foundAccount.id;

                await this.storeRepository.save({
                    id: storeID,
                    status: "Active"
                })

                return 'The store has been active';
            }
        } catch (error) {
            console.log(error + ' at enablingShop in adminService');
        }
    }

    showUser = async () => {
        try {
            let allAccount = await this.userRepository.find({
                relations: true,
                where: {
                    role: "staff"
                }
            })
            if (!allAccount) {
                return 'There is no account that exists';
            } else {
                return allAccount;
            }
        } catch (error) {
            console.log(error + ' at showUser in adminService');
        }
    }
}

export default new AdminService();

