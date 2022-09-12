import qs from "qs";
import { IPost } from "../../models/IPost";
import { ApiCore } from "./core/api.core";

class ApiPosts extends ApiCore {

    getPosts(pageIndex: number, categoryIds: string[]): Promise<IPost[]> {

        const params = {
            categoryIds: categoryIds
        };

        const queryString = qs.stringify(params, { indices: false });

        return this.get<IPost[]>(`GetPostsByCategories?pageIndex=${pageIndex}&${queryString}`);
    }
}

const apiPosts = new ApiPosts();

export default apiPosts;