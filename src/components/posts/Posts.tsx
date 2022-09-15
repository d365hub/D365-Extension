import Post from "../post/post";
import { IPost } from "../../models/IPost";
import CardPlaceholder from "../cardPlaceholder/CardPlaceholder";
import { useEffect, useState } from "react";
import storage from "../../services/storage.service";
import apiCategories from "../../services/api/api.categories";
import { ICategory } from "../../models/ICategory";
import apiPosts from "../../services/api/api.posts";

function Posts() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const categoriesKey = "categories";

    useEffect(() => {

        async function getData() {

            setLoading(true);

            let categoriesData = await storage.get(categoriesKey);

            console.log('categoriesData', categoriesData);

            let categories: ICategory[] = categoriesData.categories || [];

            if (categories.length === 0) {
                categories = await apiCategories.getCategories();
                categories.map(c => c.isSelected = true);

                await storage.set({ "categories": categories });

                categoriesData = await storage.get(categoriesKey);

                console.log('categoriesData', categoriesData);
            }

            const selectedCategoryIds = categories.filter(c => c.isSelected).map(c => c.id);

            const response = await apiPosts.getPosts(pageIndex, selectedCategoryIds);

            setPosts([...posts, ...response]);

            setLoading(false);

        }

        getData();

    }, [pageIndex]);

    return (
        <>
            {loading && <div>
                <CardPlaceholder />
                <CardPlaceholder />
                <CardPlaceholder />
            </div>}

            {posts &&
                posts.map((post: IPost) => (
                    <Post id={post.id} title={post.title} image={post.image} date={post.date} slugTitle={post.slugTitle} blog={post.blog} />
                ))
            }

            {!loading &&
                <div className="d-grid gap-2 mb-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => {
                        setLoading(true);
                        setPageIndex(pageIndex + 1);
                    }}>more...</button>
                </div>
            }
        </>

    )
}



export default Posts;