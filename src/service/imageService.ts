import {AppDataSource} from "../data-source";
import {Image} from "../entity/image";

class StaffService {
    private ImageRepository;

    constructor() {
        this.ImageRepository = AppDataSource.getRepository(Image);
    }

    getSubImagesByProductId = async (productID) => {
        try {
            const images = await this.ImageRepository.find({
                where: {
                    product: {
                        id: productID
                    }
                }
            });
            const urls = images.map(image => image.url);
            return urls;
        } catch (error) {
            console.log('No sub image found');
        }
    }


}

export default new StaffService();