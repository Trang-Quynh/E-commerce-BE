import {AppDataSource} from "../data-source";
import {Product} from "../entity/product";
import {Between, Like} from "typeorm";
import {productRouter} from "../router/productRouter";

class ProductService {
    private ProductRepository;

    constructor() {
        this.ProductRepository = AppDataSource.getRepository(Product);
    }

    getAllProduct = async () => {
        try {
            return await this.ProductRepository.find({
                relations: {
                    category:true
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    getAllProductByStoreId = async (storeId) => {
        try {
            return await this.ProductRepository.find({
                relations: [
                    'store','category'
                ],
                where: {
                    store: {
                        id: storeId
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    getMainProduct = async (page,page_size) => {
        let start = (page -1) * page_size;
        let end = start + parseInt(page_size)
        let products = await this.ProductRepository.find({
            relations:{
                store: true
            },
            select: {
                store : {
                    id :true
                }
            }
        })
        let listProducts = products.slice(start,end)
        let total = products.length
        return {
            listProducts: listProducts,
            total:total
        }
    }
    searchProductByID = async (productID) => {
        try {
            const findProduct = await this.ProductRepository.findOne({
                relations:{
                    category: true,
                    store: true
                },
                where: {
                    id: productID
                },
            })
            if (!findProduct) {
                return 'There is no product found';
            } else {
                return findProduct;
            }
        } catch (error) {
            console.log(error + ' at searchProductByID in productService');
        }
    }

    searchProductByName = async (page,page_size,name) => {
        let start = (page -1) * page_size;
        let end = start + parseInt(page_size)

            let products = await this.ProductRepository.find({
                relations: {
                    category: true,
                    store: true
                },
                where: {
                    name: Like(`${name}%`)
                },
                select: {
                    store : {
                        id :true
                    }
                }
            })
        let total = products.length
        let listProducts = products.slice(start,end)
        return {
            total: total,
            listProducts: listProducts
        }


    }

    searchProductByCategoryID = async (categoryID) => {
        try {
            const findProducts = await this.ProductRepository.find({
                relations: true,
                where: {
                    category: {
                        id: categoryID
                    }
                }
            })
            if (!findProducts) {
                return 'There is no product found';
            } else {
                return findProducts;
            }
        } catch (error) {
            console.log(error + ' at searchProductByCategoryID in productService');
        }
    }

    searchProductByPrice = async (min, max) => {
        try {
            let Min = parseInt(min), Max = parseInt(max);
            let findProducts = await this.ProductRepository.find({
                where: {
                    price: Between(Min, Max)
                }
            })
            if (!findProducts) {
                return 'There is no product found';
            }
            return findProducts;
        } catch (error) {
            console.log(error + ' at searchProductByPrice in productService');
        }
    }
    searchProductByIdShop = async (page,page_size,idShop) => {
        let start = (page -1) * page_size;
        let end = start + parseInt(page_size)
        const products =  await this.ProductRepository.find({
            relations: {
                store: true
            },
            where: {
                store: {id:idShop}
            },
            select: {
                store : {
                    id :true,
                    name: true,
                    avatar: true,
                    address: true,
                    telephone: true,
                    email: true
                }
            }
        })
        let total = (products.length + 1)
        let newProducts = products.slice(start,end)
        return {
            total,newProducts
        }

    }


    updateProductQuantityService = async (productId, quantity) => {
        try {
            await this.ProductRepository.update({id:productId}, {quantity: quantity})
        } catch (error) {
            console.log(error + 'at update product quantity');
        }
    }

    getOneProductById = async (productId) => {
        try {
        let product = await this.ProductRepository.findOne({
                where: {
                    id: productId
                }
            })
            return product;
        } catch (error) {
            console.log(error + 'at find one product by id');
        }
    }


}

export default new ProductService();