import {AppDataSource} from "../data-source";
import {Category} from "../entity/category";

class CategoryService {
    private CategoryRepository;

    constructor() {
        this.CategoryRepository = AppDataSource.getRepository(Category);
    }

    getCategoryList = async () => {
        try {
            let findCategory = await this.CategoryRepository.find();
            if (!findCategory) {
                return 'There is no category';
            } else {
                return findCategory;
            }
        } catch (error) {
            console.log(error + ' at getCategoryList in categoryService');
        }
    }

    searchCategoryByID = async (categoryID) => {
        try {
            let findCategory = await this.CategoryRepository.find({
                where: {
                    id: categoryID
                }
            })
            if (!findCategory) {
                return 'There is no category found';
            } else {
                return findCategory;
            }
        } catch (error) {
            console.log(error + ' at searchCategoryByID in categoryService');
        }
    }
}

export default new CategoryService();