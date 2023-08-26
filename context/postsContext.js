import React, { createContext, useCallback } from "react";

const PostsContext = createContext({
    posts: [],
    setPostsFromSSR: () => {}
});

export default PostsContext

export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const setPostsFromSSR = useCallback((postsFromSSR = []) => {
        console.log("Setting posts from SSR", postsFromSSR);
        setPosts(postsFromSSR);
    }
    , [postsFromSSR]);

    return (
        <PostsContext.Provider value={{posts, setPostsFromSSR}}>
            {children}
        </PostsContext.Provider>
    )
}