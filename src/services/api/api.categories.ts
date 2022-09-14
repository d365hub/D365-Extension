import { ICategory } from "../../models/ICategory";
import { ApiCore } from "./core/api.core"


class ApiCategories extends ApiCore {

    getCategories(): Promise<ICategory[]> {
        return this.get<ICategory[]>('GetCategories');
    }
}

const apiCategories = new ApiCategories();

export default apiCategories;