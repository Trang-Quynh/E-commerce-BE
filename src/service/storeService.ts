import {AppDataSource} from "../data-source";
import {Store} from "../entity/store";
import {User} from "../entity/user";
import bcrypt from "bcrypt";
import {StoreType} from "../entity/storeType";

class StoreService {
    private StoreRepository;
    private UserRepository;
    private StoreTypeRepository;

    constructor() {
        this.StoreRepository = AppDataSource.getRepository(Store);
        this.UserRepository = AppDataSource.getRepository(User);
        this.StoreTypeRepository = AppDataSource.getRepository(StoreType)
    }

    showStoreInformation = async (userID) => {
        //
        try {
            const storeInfo = await this.StoreRepository.findOne({
                relations: {
                    storeType: true
                }, where: {
                    userId: userID
                }
            });
            if (!storeInfo) {
                return 'There is no store found';
            } else {
                return storeInfo;
            }
        } catch (error) {
            console.log(error + ' at showStoreInformation in storeService');
        }
    }

    showStoreType = async () => {
        try {
            const storeType = await this.StoreTypeRepository.find({});
            if (!storeType) {
                return 'There is no store type found';
            } else {
                return storeType;
            }
        } catch (error) {
            console.log(error + ' at showStoreType in storeService');
        }
    }

    createStoreDetail = async (store) => {
        try {
           let createdShop = await this.StoreRepository.save(store)
            return createdShop;
        } catch (error) {
            console.log(error + ' at createStoreDetail in storeService');
        }
    }

    searchStoreByID = async (storeID) => {
        try {
            const foundStore = await this.StoreRepository.findOne({
                relations: {
                    storeType: true
                }, where: {
                    id: storeID
                }
            });
            if (!foundStore) {
                return 'There is no store found';
            } else {
                return foundStore;
            }
        } catch (error) {
            console.log(error + ' at searchStoreByID in storeService');
        }
    }

    // Update editStoreDetail cause un-optimized code
    editStoreDetail = async (userID, storeDetail) => {
        try {
            let foundAccount = await this.StoreRepository.find({
                relations: true,
                where: {
                    userId: {
                        id: userID
                    }
                }
            })

            if (!foundAccount) {
                return 'There is no account that exists';
            } else {
                await this.showStoreInformation(userID);

                await this.StoreRepository.save({
                    id: foundAccount.id,
                    name: storeDetail.name,
                    avatar: storeDetail.avatar,
                    email: storeDetail.email,
                    origin: storeDetail.origin,
                    country: storeDetail.country,
                    telephone: storeDetail.telephone,
                    address: storeDetail.address,
                    storeTypeId: storeDetail.storeTypeId
                });

                storeDetail.password = await bcrypt.hash(storeDetail.password, 10);

                await this.UserRepository.save({
                    id: userID,
                    password: storeDetail.password
                })

                // return await this.storeRepository
                //     .createQueryBuilder()
                //     .update(Store)
                //     .set({
                //         name: storeDetail.name,
                //         avatar: storeDetail.avatar,
                //         email: storeDetail.email,
                //         origin: storeDetail.origin,
                //         country: storeDetail.country,
                //         telephone: storeDetail.telephone,
                //         address: storeDetail.address,
                //         storeType: storeDetail.storeType.id
                //     })
                //     .where({id: storeID})
                //     .execute()

                return 'Store updated';
            }
        } catch (error) {
            console.log(error + ' at editStoreDetail in storeService');
        }
    }
    findOwnStore = async (storeID) => {
        try {
            const foundStore = await this.StoreRepository.findOne({
                relations: {
                    storeType: true,
                    products: true
                }, where: {
                    id: storeID
                }
            });
            if (!foundStore) {
                return 'There is no store found';
            } else {
                return foundStore;
            }
        } catch (error) {
            console.log(error + ' at searchStoreByID in storeService');
        }
    }


    updateStoreInformationService = async (shopId, updateStore) => {
        try {
            await this.StoreRepository.update(shopId, updateStore);
        } catch (error) {
            console.log(error + ' at searchStoreByID in storeService');
        }
    }
    showStore = async () => {
        let store = await this.StoreRepository.find()
        let newStore = store.slice(0,4)
        return newStore
    }






}

export default new StoreService();