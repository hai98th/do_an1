import PostsContainer from "../modules/blog/containers/PostsContainer";
import BlogTypeContainer from "../modules/blogType/BlogTypeContainer";
import BlogEditor from "../modules/blog/editor/BlogEditor";

/**
 * Tab Blog
 */
export default [
    {
        path: "/blog/posts",
        component: PostsContainer,
    },
    {
        path: "blog/blogtypes",
        component: BlogTypeContainer,
    },
    {
        path: "blog/editor",
        component: BlogEditor,
    },
    {
        path: "blog/:postId/editor",
        component: BlogEditor
    }
];
