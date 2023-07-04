import {AppDataSource} from "../data-source";
import {Product} from "../entity/product";
import {Image} from "../entity/image";
import {Store} from "../entity/store"
import StoreService from "./productService";
import {Like} from "typeorm";

class SellerService {
    private ProductRepository;
    private ImageRepository;
    private StoreRepository;
    private StoreService;

    constructor() {
        this.ProductRepository = AppDataSource.getRepository(Product);
        this.ImageRepository = AppDataSource.getRepository(Image);
        this.StoreRepository = AppDataSource.getRepository(Store);
        this.StoreService = StoreService;
    }

  searchProduct = async (name,storeId) => {
      return await this.ProductRepository.find({
          where: {
              name: Like (`${name}%`),
              store: {
                  id: storeId
              }
          },
          relations: {
              category: true
          }
      })
  }

    showAllStoreInformation = async (storeID) => {
        const storeInformation = await this.StoreService.showStoreInformation(storeID);
        return storeInformation;
    }

    updateStoreInformation = async (storeID) => {

    }

    addImage = async (productId, images) => {
        for await (const image of images) {
            try {
                await this.ImageRepository.save({product: productId, url: image});
            } catch (error) {
                console.log(error)
            }
        }
    }

    createProduct = async (product) => {
        try {
            const createdProduct = await this.ProductRepository.save(product);
            return createdProduct;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to create product.");
        }
    }

    editProductService = async (productId, updateProduct) => {
        try {
            await this.ProductRepository.update({id: productId}, updateProduct);
        } catch (error) {
            console.error(error);
            throw new Error('Error while updating product');
        }
    }

    editImagesService = async (productId, images) => {
        try {
            await this.ImageRepository.delete({ product: { id: productId } });
            await this.addImage(productId, images)
        } catch (error) {
            console.error(error);
            throw new Error('Error while updating images for product');
        }
    }


}

export default new SellerService();