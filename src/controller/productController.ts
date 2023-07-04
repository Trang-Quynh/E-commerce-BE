import {Request, Response} from "express";
import ProductService from "../service/productService";
import ImageService from "../service/imageService";

class ProductController {
    private ProductService
    private ImageService


    constructor() {
        this.ProductService = ProductService;
        this.ImageService = ImageService
    }
    getAllProduct = async (req:Request,res:Response) => {
        try {
            let products = await ProductService.getAllProduct()
            await res.status(201).json(products)
        }catch (error){
            console.log(error)
        }
    }
    getAllProductByStoreId = async (req:Request,res:Response) => {
        try {
            const storeId = req.body.data;
            let products = await ProductService.getAllProductByStoreId(storeId);
            await res.status(201).json(products)
        }catch (error){
            console.log(error)
        }
    }
    getMainProduct = async (req:Request,res:Response) => {
        let page = req.query.page;
        let page_size = req.query.page_size
        try {
            let listProducts = await this.ProductService.getMainProduct(page,page_size)
             res.status(200).json({
                data: listProducts,
                success: true,
                message: "oke"
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                error: error,
                message: "error in getMainProduct"
            })
        }
    }

    searchProductWithID = async (req: Request, res: Response) => {
        try {
            let productID = req.params.id;
            let product = await ProductService.searchProductByID(productID);
            let images = await ImageService.getSubImagesByProductId(productID);
            product.images = images
            await res.status(202).json(product);
        } catch (error) {
            await res.status(500).json(error + ' at searchProductWithID in productController');
        }
    }

    getProductDetail = async (req: Request, res: Response) => {
        try {
            let productID = req.params.id;
            let product = await ProductService.searchProductByID(productID);
            let images = await ImageService.getSubImagesByProductId(productID);
            product.images = images
            await res.status(202).json(product);
        } catch (error) {
            await res.status(500).json(error + ' at get product detail');
        }
    }



    searchProductByName = async (req: Request, res: Response) => {
        let name = req.query.name;
        let page = req.query.page;
        let page_size = req.query.page_size
        try {
            let data = await ProductService.searchProductByName(page,page_size,name);
            await res.status(202).json({
                success:true,
                message: "oke",
                data: data
            });
        } catch (error) {
            await res.status(500).json({
                success: false,
                message: "error in server at searchProductByName",
                error: error
            });
        }
    }

    searchProductWithCategory = async (req: Request, res: Response) => {
        try {
            let categoryID = req.query.categoryID;
            let productsStatus = await ProductService.searchProductByCategoryID(categoryID);
            await res.status(202).json(productsStatus)
        } catch (error) {
            await res.status(500).json(error + ' at searchProductWithCategory in productController');
        }
    }

    searchProductWithPrice = async (req: Request, res: Response) => {
        try {
            let min = req.query.min;
            let max = req.query.max;
            let productsStatus = await ProductService.searchProductByPrice(min, max);
            await res.status(202).json(productsStatus)
        } catch (error) {
            await res.status(500).json(error + ' at searchProductWithPrice in productController');
        }
    }


}

export default new ProductController();