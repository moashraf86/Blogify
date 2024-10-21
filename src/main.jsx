import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreatePost } from "./pages/CreatePost.jsx";
import { EditPost } from "./pages/EditPost.jsx";
import { Post } from "./pages/Post.jsx";
import { Bookmarks } from "./pages/Bookmarks.jsx";
import { Posts } from "./pages/posts.jsx";
import { MyPosts } from "./pages/MyPosts.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import "remixicon/fonts/remixicon.css";
import App from "./App.jsx";
import "./index.css";
import { fetchPost } from "./services/fetchPost.js";
import { SignIn } from "./pages/SignIn.jsx";
import { PrivateRouter } from "./pages/PrivateRouter.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/signin", element: <SignIn /> },
      {
        path: "/",
        element: (
          <PrivateRouter>
            <Posts />
          </PrivateRouter>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <PrivateRouter>
            <Post />
          </PrivateRouter>
        ),
      },
      {
        path: "/create",
        element: (
          <PrivateRouter>
            <CreatePost />
          </PrivateRouter>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <PrivateRouter>
            <EditPost />
          </PrivateRouter>
        ),
        loader: async ({ params }) => {
          const postId = params.id;
          const post = await fetchPost(postId);
          if (!post) {
            return { status: 404 };
          }
          return { post };
        },
      },
      {
        path: "/bookmarks",
        element: (
          <PrivateRouter>
            <Bookmarks />
          </PrivateRouter>
        ),
        loader: () => import("./pages/Bookmarks.jsx"),
      },
      {
        path: "/my-posts",
        element: (
          <PrivateRouter>
            <MyPosts />
          </PrivateRouter>
        ),
      },
      {
        path: "/drafts",
        element: (
          <PrivateRouter>
            <MyPosts />
          </PrivateRouter>
        ),
      },
      {
        path: "/users/:id",
        element: (
          <PrivateRouter>
            <UserProfile />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
