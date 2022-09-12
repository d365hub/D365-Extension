import { useEffect, useState } from "react";
import Post from "../post/post";
import { IPost } from "../../models/IPost";
import apiPosts from "../../services/api/api.posts";
import CardPlaceholder from "../cardPlaceholder/CardPlaceholder";
import apiCategories from "../../services/api/api.categories";

function Posts() {
    const [posts, setData] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                chrome.storage.local.get("categories", async (data) => {
                    if (!data?.categories) {
                        const categories = await apiCategories.getCategories();
                        const categoryIds = categories.map(c => c.id);
                        await chrome.storage.local.set({ 'categories': categoryIds });

                        data = data || {};
                        data.categories = categoryIds;
                    }

                    const response = await apiPosts.getPosts(pageIndex, data.categories);

                    setData([...posts, ...response]);

                    setLoading(false);

                    setError(null);

                });


            } catch (err) {
                console.error(err);
            }
            finally {
            }
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

            {error && (
                <div>{`There is a problem fetching the post data - ${error} `}</div>
            )}

            {posts &&
                posts.map((post: IPost) => (
                    <Post id={post.id} title={post.title} image={post.image} date={post.date} slugTitle={post.slugTitle} blog={post.blog} />
                ))
            }

            {posts.length > 0 &&
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