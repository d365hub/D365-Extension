import Post from "../post/post";
import { IPost } from "../../models/IPost";
import CardPlaceholder from "../cardPlaceholder/CardPlaceholder";

function Posts(props: any) {
    const { posts, onMore, loading } = props;

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

            {posts.length > 0 &&
                <div className="d-grid gap-2 mb-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={onMore}>more...</button>
                </div>
            }
        </>

    )
}



export default Posts;