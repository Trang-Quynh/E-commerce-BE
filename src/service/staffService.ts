import {AppDataSource} from "../data-source";
import {User} from '../entity/user'
import bcrypt from "bcrypt";

class StaffService {
    private UserRepository;

    constructor() {
        this.UserRepository = AppDataSource.getRepository(User);
    }

    // Finding staff with their ID
    searchAll = async () => {
        try {
            let foundStaff = await this.UserRepository.find({
                where: {
                    role: "user" || "staff"
                }
            })
            if (!foundStaff) {
                return 'There is no staff found';
            } else {
                return foundStaff;
            }
        } catch (error) {
            console.log(error + ' at staffCheck in staffService');
        }
    }

    searchStaff = async () => {
        try {
            let foundStaff = await this.UserRepository.find({
                where: {
                    role: "staff"
                }
            })
            return foundStaff;
        } catch (error) {
            console.log(error + ' at staffCheck in staffService');
        }
    }

    // Finding user with their ID
    searchUser = async () => {
        try {
            let foundStaff = await this.UserRepository.find({
                where: {
                    role: "user"
                }
            })
            if (!foundStaff) {
                return 'There is no staff found';
            } else {
                return foundStaff;
            }
        } catch (error) {
            console.log(error + ' at staffCheck in staffService');
        }
    }

    // Staff updating their information
    staffUpdate = async (userInfo) => {
        try {
            userInfo.password = await bcrypt.hash(userInfo.password, 10);
            return await this.UserRepository.save(userInfo);
        } catch (error) {
            console.log(error + ' at staffUpdate in staffService');
        }
    }

    getStaffs = async () => {
        let staffs = await this.UserRepository.find({
            where: {
                role: "staff"
            },
        })
        return staffs
    }

    checkStaff = async (staff) => {
        let username = await this.UserRepository.find({where: {username: staff.username}});
        let email = await this.UserRepository.find({where: {email: staff.email}});

        return (username[0] ? "This username has already existed" : (email[0] ? "This email has already existed" : null));
    }

    addStaffs = async (staff) => {
        const hashed = await bcrypt.hash(staff.password, 10)
        let {password, ...resolvedStaff} = staff;
        resolvedStaff.password = hashed
        let savedUser = await this.UserRepository.save(resolvedStaff);
        return savedUser;
    }

    paginationStaff = async (page, page_size) => {
        let start = (page - 1) * page_size;
        let end = start + parseInt(page_size)
        let staffs = await this.getStaffs()
        let paginationStaff = staffs.slice(start, end)
        return {
            total: staffs.length,
            paginationStaff: paginationStaff
        }
    }

    deleteStaff = async (idStaff) => {
        if (idStaff) {
            await this.UserRepository.delete({id: idStaff}).then((data) => {
                console.log(data)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            return "Staff not exits"
        }

    }
    staffUpdateById = async (id, staff) => {
        let newPassword = await bcrypt.hash(staff.password, 10)
        staff.password = newPassword;
        await this.UserRepository
            .createQueryBuilder()
            .update({
                username: staff.username,
                password: staff.password,
                email: staff.email,
                address: staff.address,
                age: staff.age,
                image: staff.image,
                name: staff.name,
                phoneNumber: staff.phoneNumber,
                salary: staff.salary,
                role: 'staff'
            })
            .where({id: id})
            .execute()
    }
    searchStaffById = async (idStaff) => {
        let staff = await this.UserRepository.find({
                where: {
                    id: idStaff,
                },
            }
        )
        return staff
    }

}

export default new StaffService();