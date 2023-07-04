import {Request, Response} from "express";
import categoryService from "../service/categoryService";


class CategoryController{
    private categoryService;
    constructor() {
        this.categoryService = categoryService
    }

    getCategory = async (req: Request, res: Response) => {
        try {
            let categoryList = await this.categoryService.getCategoryList();
            await res.status(202).json(categoryList);
        } catch (error) {
            await res.status(500).json(error + ' at getCategory in categoryController');
        }
    }

    searchCategoryWithID = async (req: Request, res: Response) => {
        try {
            let categoryID = req.query.categoryID;
            let categoryStatus = await this.categoryService.searchCategoryByID(categoryID);
            await res.status(202).json(categoryStatus);
        } catch (error) {
            await res.status(500).json(error + ' at searchCategoryWithID in categoryController');
        }
    }

}
export default new CategoryController()